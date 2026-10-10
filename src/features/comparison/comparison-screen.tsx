import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionLink } from '@/components/action-link';
import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ComparisonRow } from '@/components/comparison-row';
import { EdibilityBadge } from '@/components/edibility-badge';
import { Disclosure } from '@/components/disclosure';
import { ExternalReference } from '@/components/external-reference';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { SafetyNotice } from '@/components/safety-notice';
import { SpeciesSelector } from '@/components/species-selector';
import { atlasMetadata, getMushroom, getPair, getPhoto, mushrooms } from '@/data/atlas';
import { thumbnailAssets } from '@/data/photo-assets';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { Mushroom } from '@/types/atlas';
import {
  type ComparisonSelection,
  resolveComparisonSelection,
  selectComparisonSpecies,
  swapComparisonSpecies,
} from '@/utils/comparison';

export default function ComparisonScreen() {
  const params = useLocalSearchParams<{ first?: string; second?: string }>();
  return (
    <ComparisonContent
      key={`${params.first ?? ''}|${params.second ?? ''}`}
      initialSelection={resolveComparisonSelection(mushrooms, {
        firstId: params.first,
        secondId: params.second,
      })}
    />
  );
}

function ComparisonContent({ initialSelection }: { initialSelection: ComparisonSelection }) {
  const { width, height, fontScale } = useWindowDimensions();
  const compactIdentities = fontScale > 1.3 && height < 700;
  const [selection, setSelection] = useState(initialSelection);
  const first = getMushroom(selection.firstId);
  const second = getMushroom(selection.secondId);
  const selected: [Mushroom, Mushroom] | undefined = first && second ? [first, second] : undefined;
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <ScrollView
        key={`${first?.id ?? ''}|${second?.id ?? ''}`}
        stickyHeaderIndices={selected ? [1] : undefined}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introduction}>
          <AppText variant="eyebrow">{pl.comparison.eyebrow}</AppText>
          <AppText variant="title" accessibilityRole="header">
            {pl.comparison.title}
          </AppText>
          <AppText>{pl.comparison.description}</AppText>
          <View
            style={[styles.selectors, width >= 600 && fontScale <= 1.3 && styles.wideSelectors]}
          >
            <SpeciesSelector
              label={pl.selection.first}
              selectedId={first?.id}
              excludedId={second?.id}
              onSelect={(id) =>
                setSelection((current) =>
                  selectComparisonSpecies(mushrooms, current, 'firstId', id),
                )
              }
            />
            <SpeciesSelector
              label={pl.selection.second}
              selectedId={second?.id}
              excludedId={first?.id}
              onSelect={(id) =>
                setSelection((current) =>
                  selectComparisonSpecies(mushrooms, current, 'secondId', id),
                )
              }
            />
          </View>
          <Button
            label={pl.comparison.swap}
            secondary
            icon="swap-horizontal-outline"
            disabled={!selected}
            onPress={() => setSelection(swapComparisonSpecies)}
          />
        </View>
        {selected && (
          <View style={styles.sticky} testID="comparison-identities">
            <View style={styles.columns}>
              {selected.map((mushroom, index) => (
                <View key={mushroom.id} style={[styles.cell, index === 1 && styles.second]}>
                  {!compactIdentities && (
                    <AppText variant="eyebrow">
                      {index === 0 ? pl.comparison.firstColumn : pl.comparison.secondColumn}
                    </AppText>
                  )}
                  <AppText style={styles.name}>{mushroom.polishName}</AppText>
                  {!compactIdentities && (
                    <>
                      <AppText style={styles.scientific}>{mushroom.scientificName}</AppText>
                      <EdibilityBadge edibility={mushroom.edibility} />
                    </>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={styles.details}>
          {selected ? (
            <ComparisonDetails selected={selected} compactIdentities={compactIdentities} />
          ) : (
            <PlaceholderPanel
              icon="git-compare-outline"
              title={pl.comparison.emptyTitle}
              description={pl.comparison.emptyDescription}
            />
          )}
          <SafetyNotice />
          <ActionLink href="/" label={pl.comparison.atlasAction} secondary replace />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ComparisonDetails({
  selected,
  compactIdentities,
}: {
  selected: [Mushroom, Mushroom];
  compactIdentities: boolean;
}) {
  const pair = getPair(selected[0].id, selected[1].id);
  const rows: { label: string; describe: (mushroom: Mushroom) => string | string[] }[] = [
    { label: pl.species.keyFeatures, describe: (item) => item.keyFeatures },
    {
      label: pl.comparison.edibility,
      describe: (item) => [pl.edibility[item.edibility], item.edibilityNote],
    },
    { label: pl.species.cap, describe: (item) => item.cap },
    { label: pl.species.stem, describe: (item) => item.stem },
    { label: pl.species.hymenophore, describe: (item) => item.hymenophore.description },
    { label: pl.species.flesh, describe: (item) => item.flesh },
    { label: pl.species.damageReaction, describe: (item) => item.damageReaction },
    { label: pl.species.habitat, describe: (item) => item.habitat },
    {
      label: pl.species.occurrence,
      describe: (item) => [
        item.occurrenceMonths.map((month) => pl.months.full[month - 1]).join(', '),
        item.occurrenceNote,
      ],
    },
  ];
  return (
    <>
      <View style={styles.columns} testID="comparison-photos">
        {selected.map((mushroom, index) => (
          <View key={mushroom.id} style={[styles.cell, index === 1 && styles.second]}>
            {compactIdentities && (
              <>
                <AppText variant="eyebrow">
                  {index === 0 ? pl.comparison.firstColumn : pl.comparison.secondColumn}
                </AppText>
                <AppText style={styles.scientific}>{mushroom.scientificName}</AppText>
                <EdibilityBadge edibility={mushroom.edibility} />
              </>
            )}
            <ComparisonPhoto mushroom={mushroom} />
          </View>
        ))}
      </View>
      {atlasMetadata.expertReviewStatus === 'pending' && (
        <AppText style={styles.review}>{pl.safety.reviewPending}</AppText>
      )}
      {pair ? (
        <View style={styles.curated}>
          <AppText variant="heading" accessibilityRole="header">
            {pl.comparison.differences}
          </AppText>
          {pair.note && <AppText style={styles.review}>{pair.note}</AppText>}
          {pair.differences.map((difference) => (
            <ComparisonRow
              key={difference.feature}
              label={difference.feature}
              values={difference.values}
            />
          ))}
          <AppText>{`${pl.details.sourceCheck}: ${pair.reviewedAt}`}</AppText>
          {pair.referenceIds.map((id) => {
            const reference = atlasMetadata.references.find((item) => item.id === id);
            return reference ? (
              <ExternalReference key={id} url={reference.url} label={reference.title} />
            ) : null;
          })}
        </View>
      ) : (
        <AppText>{pl.comparison.noPair}</AppText>
      )}
      {rows.map(({ label, describe }) => (
        <ComparisonRow
          key={label}
          label={label}
          values={[describe(selected[0]), describe(selected[1])]}
        />
      ))}
    </>
  );
}

function ComparisonPhoto({ mushroom }: { mushroom: Mushroom }) {
  const photo = getPhoto(mushroom.photoIds[0] ?? '');
  return (
    <>
      {photo && (
        <>
          <Image
            source={thumbnailAssets[photo.id]}
            accessibilityLabel={photo.caption}
            contentFit="contain"
            style={styles.photo}
          />
          <AppText style={styles.credit}>{photo.caption}</AppText>
          <AppText style={styles.credit}>{`${pl.photos.author}: ${photo.author}`}</AppText>
          <Disclosure title={pl.photos.attribution} compact>
            <ExternalReference url={photo.sourceUrl} label={pl.photos.source} />
            <ExternalReference
              url={photo.licenseUrl}
              label={`${pl.photos.license}: ${photo.license === 'Public domain' ? pl.photos.publicDomain : photo.license}`}
            />
            <AppText style={styles.credit}>{pl.photos.thumbnail}</AppText>
          </Disclosure>
        </>
      )}
      <ActionLink
        href={{ pathname: '/mushrooms/[id]', params: { id: mushroom.id } }}
        label={pl.comparison.openDetails}
        secondary
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1, paddingBottom: theme.spacing.large },
  introduction: {
    padding: theme.layout.gutter,
    gap: theme.spacing.medium,
    width: '100%',
    maxWidth: theme.layout.readingWidth,
    alignSelf: 'center',
  },
  sticky: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.layout.gutter,
    paddingVertical: theme.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    width: '100%',
    maxWidth: theme.layout.readingWidth,
    alignSelf: 'center',
  },
  details: {
    padding: theme.layout.gutter,
    gap: theme.spacing.medium,
    width: '100%',
    maxWidth: theme.layout.readingWidth,
    alignSelf: 'center',
  },
  columns: { flexDirection: 'row', alignItems: 'stretch' },
  selectors: { gap: theme.spacing.medium },
  wideSelectors: { flexDirection: 'row' },
  cell: { flex: 1, minWidth: 0, paddingRight: theme.spacing.small, gap: theme.spacing.small },
  second: {
    paddingRight: 0,
    paddingLeft: theme.spacing.small,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
  },
  name: { fontWeight: '700', color: theme.colors.primary },
  scientific: { fontStyle: 'italic', fontSize: 13, lineHeight: 18 },
  photo: {
    width: '100%',
    aspectRatio: 1.2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.small,
  },
  credit: { fontSize: 12, lineHeight: 18 },
  review: { color: theme.colors.warning, fontWeight: '600' },
  curated: {
    gap: theme.spacing.medium,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.medium,
  },
});
