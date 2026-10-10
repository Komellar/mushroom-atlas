import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ActionLink } from '@/components/action-link';
import { AppText } from '@/components/app-text';
import { EdibilityBadge } from '@/components/edibility-badge';
import { Disclosure } from '@/components/disclosure';
import { ExternalReference } from '@/components/external-reference';
import { FeatureList } from '@/components/feature-list';
import { OccurrenceMonths } from '@/components/occurrence-months';
import { Page } from '@/components/page';
import { PhotoGallery } from '@/components/photo-gallery';
import { SafetyNotice } from '@/components/safety-notice';
import { atlasMetadata, getMushroom, getPhoto } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export default function MushroomDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mushroom = getMushroom(id);
  if (!mushroom)
    return (
      <Page title={pl.details.missingTitle} description={pl.details.missingDescription}>
        <ActionLink href="/" label={pl.details.atlasAction} replace />
      </Page>
    );
  const sections = [
    [pl.species.cap, mushroom.cap],
    [pl.species.stem, mushroom.stem],
    [pl.species.hymenophore, mushroom.hymenophore.description],
    [pl.species.flesh, mushroom.flesh],
    [pl.species.damageReaction, mushroom.damageReaction],
    [pl.species.habitat, mushroom.habitat],
  ];
  const compareLink = { pathname: '/compare' as const, params: { first: mushroom.id } };
  return (
    <Page
      eyebrow={pl.details.eyebrow}
      title={mushroom.polishName}
      description={mushroom.scientificName}
      scientific
    >
      <Stack.Screen options={{ title: mushroom.polishName }} />
      <View style={styles.section}>
        <EdibilityBadge edibility={mushroom.edibility} />
        <AppText>{mushroom.edibilityNote}</AppText>
        {atlasMetadata.expertReviewStatus === 'pending' && (
          <AppText style={styles.review}>{pl.safety.reviewPending}</AppText>
        )}
      </View>
      <PhotoGallery key={mushroom.id} photoIds={mushroom.photoIds} />
      <ActionLink href={compareLink} label={pl.details.comparisonAction} secondary />
      <FeatureList title={pl.species.keyFeatures} items={mushroom.keyFeatures} />
      <FeatureList title={pl.species.identificationTips} items={mushroom.identificationTips} />
      {mushroom.synonyms.length > 0 && (
        <View style={styles.section}>
          <AppText variant="heading" accessibilityRole="header">
            {pl.species.synonyms}
          </AppText>
          <AppText>{mushroom.synonyms.join(', ')}</AppText>
        </View>
      )}
      {sections.map(([title, description]) => (
        <View key={title} style={styles.section}>
          <AppText variant="heading" accessibilityRole="header">
            {title}
          </AppText>
          <AppText>{description}</AppText>
        </View>
      ))}
      <OccurrenceMonths months={mushroom.occurrenceMonths} note={mushroom.occurrenceNote} />
      <View style={styles.section}>
        <AppText variant="heading" accessibilityRole="header">
          {pl.species.similar}
        </AppText>
        {mushroom.similarSpecies.map((similar) => (
          <View key={similar.scientificName} style={styles.similar}>
            <AppText variant="heading">{similar.polishName}</AppText>
            <AppText style={styles.scientific}>{similar.scientificName}</AppText>
            <AppText>{similar.difference}</AppText>
            {similar.mushroomId ? (
              <>
                <ActionLink
                  href={{ pathname: '/mushrooms/[id]', params: { id: similar.mushroomId } }}
                  label={pl.details.openSimilar}
                  secondary
                />
                <ActionLink
                  href={{
                    pathname: '/compare',
                    params: { first: mushroom.id, second: similar.mushroomId },
                  }}
                  label={pl.details.compareSimilar}
                  secondary
                />
              </>
            ) : (
              <AppText>{pl.details.notInAtlas}</AppText>
            )}
          </View>
        ))}
      </View>
      <SafetyNotice />
      <Disclosure title={pl.species.references}>
        {mushroom.referenceIds.map((referenceId) => {
          const reference = atlasMetadata.references.find((item) => item.id === referenceId);
          return reference ? (
            <View key={reference.id}>
              <ExternalReference url={reference.url} label={reference.title} />
              <AppText>{reference.publisher}</AppText>
            </View>
          ) : null;
        })}
        <AppText>{`${pl.details.sourceCheck}: ${mushroom.reviewedAt} · ${pl.details.dataVersion}: ${mushroom.datasetVersion}`}</AppText>
      </Disclosure>
      <Disclosure title={pl.species.credits}>
        {mushroom.photoIds.map((photoId) => {
          const photo = getPhoto(photoId);
          return photo ? (
            <View key={photo.id} style={styles.similar}>
              <AppText>{photo.caption}</AppText>
              <AppText>{photo.author}</AppText>
              <ExternalReference url={photo.sourceUrl} label={pl.photos.source} />
              <ExternalReference
                url={photo.licenseUrl}
                label={`${pl.photos.license}: ${photo.license === 'Public domain' ? pl.photos.publicDomain : photo.license}`}
              />
              {photo.downloadUrl.includes('/thumb/') && <AppText>{pl.photos.resized}</AppText>}
            </View>
          ) : null;
        })}
      </Disclosure>
      <ActionLink href="/" label={pl.details.atlasAction} secondary replace />
    </Page>
  );
}
const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.medium,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  similar: {
    gap: theme.spacing.small,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.medium,
    marginBottom: theme.spacing.small,
  },
  scientific: { fontStyle: 'italic' },
  review: { color: theme.colors.warning, fontSize: 12, lineHeight: 18 },
});
