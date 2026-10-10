import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionLink } from '@/components/action-link';
import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { SafetyNotice } from '@/components/safety-notice';
import { SearchField } from '@/components/search-field';
import { SpeciesCard } from '@/components/species-card';
import { atlasMetadata, mushrooms } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { Mushroom } from '@/types/atlas';
import { type EdibilityFilter, queryMushrooms } from '@/utils/atlas-query';
import { atlasState } from './atlas-state';
import { AtlasHero } from './atlas-hero';
const filters: EdibilityFilter[] = ['all', 'edible', 'inedible', 'poisonous'];
export default function AtlasScreen() {
  const { width, fontScale } = useWindowDimensions();
  const columns = width >= 760 && fontScale <= 1.3 ? 2 : 1;
  const [query, setQuery] = useState(atlasState.query);
  const [filter, setFilter] = useState(atlasState.filter);
  const list = useRef<FlatList<Mushroom>>(null);
  const results = useMemo(() => queryMushrooms(mushrooms, query, filter), [query, filter]);
  useFocusEffect(
    useCallback(() => {
      const offset = atlasState.offset;
      const frame = requestAnimationFrame(() =>
        list.current?.scrollToOffset({ offset, animated: false }),
      );
      return () => cancelAnimationFrame(frame);
    }, []),
  );
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      list.current?.scrollToOffset({ offset: atlasState.offset, animated: false }),
    );
    return () => cancelAnimationFrame(frame);
  }, [columns]);
  const update = (nextQuery: string, nextFilter: EdibilityFilter) => {
    atlasState.query = nextQuery;
    atlasState.filter = nextFilter;
    atlasState.offset = 0;
    setQuery(nextQuery);
    setFilter(nextFilter);
    list.current?.scrollToOffset({ offset: 0, animated: false });
  };
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <FlatList
        key={columns}
        ref={list}
        numColumns={columns}
        columnWrapperStyle={columns === 2 ? styles.columns : undefined}
        data={results}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        onScroll={(event) => {
          atlasState.offset = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={32}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={[styles.item, columns === 2 && styles.gridItem]}>
            <SpeciesCard mushroom={item} />
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <AtlasHero speciesCount={mushrooms.length} />
            <View style={styles.collectionHeading}>
              <AppText variant="heading" accessibilityRole="header">
                {pl.atlas.collection}
              </AppText>
              <AppText
                variant="caption"
                accessibilityLiveRegion="polite"
                accessibilityLabel={`${pl.atlas.results}: ${results.length}`}
              >{`${results.length} / ${mushrooms.length}`}</AppText>
            </View>
            <SearchField
              value={query}
              onChangeText={(value) => update(value, filter)}
              placeholder={pl.atlas.searchPlaceholder}
              label={pl.atlas.search}
            />
            <View style={styles.filters}>
              {filters.map((value) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: value === filter }}
                  onPress={() => update(query, value)}
                  style={({ pressed }) => [
                    styles.filter,
                    value === filter && styles.selected,
                    pressed && styles.pressed,
                  ]}
                >
                  {value === filter && (
                    <Ionicons
                      name="checkmark"
                      size={15}
                      color={theme.colors.surface}
                      accessible={false}
                    />
                  )}
                  <AppText style={value === filter ? styles.selectedLabel : styles.filterLabel}>
                    {value === 'all' ? pl.atlas.all : pl.edibility[value]}
                  </AppText>
                </Pressable>
              ))}
            </View>
            <View style={styles.resultBar}>
              <View style={styles.reviewNote}>
                <Ionicons
                  name="shield-outline"
                  size={16}
                  color={theme.colors.warning}
                  accessible={false}
                />
                <AppText variant="caption" style={styles.reviewText}>
                  {atlasMetadata.expertReviewStatus === 'pending'
                    ? pl.safety.reviewPending
                    : pl.safety.title}
                </AppText>
              </View>
              {results.length > 0 && (query.length > 0 || filter !== 'all') && (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => update('', 'all')}
                  style={styles.reset}
                >
                  <AppText variant="caption" style={styles.resetLabel}>
                    {pl.atlas.resetFilters}
                  </AppText>
                </Pressable>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="search-outline"
              size={36}
              color={theme.colors.muted}
              accessible={false}
            />
            <AppText variant="heading">{pl.atlas.noResults}</AppText>
            <AppText>{pl.atlas.noResultsDescription}</AppText>
            <Button label={pl.atlas.clear} onPress={() => update('', 'all')} />
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <AppText variant="caption">{pl.photos.thumbnail}</AppText>
            <View style={styles.comparePanel}>
              <Ionicons
                name="git-compare-outline"
                size={28}
                color={theme.colors.primary}
                accessible={false}
              />
              <AppText variant="heading">{pl.atlas.compareHint}</AppText>
              <AppText>{pl.atlas.compareDescription}</AppText>
              <ActionLink href="/compare" label={pl.atlas.comparisonAction} secondary />
            </View>
            <SafetyNotice />
          </View>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  list: {
    padding: theme.layout.gutter,
    maxWidth: theme.layout.atlasWidth,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: theme.spacing.large,
  },
  header: { gap: theme.spacing.medium, marginBottom: theme.spacing.medium },
  collectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.small,
    marginTop: theme.spacing.small,
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  filter: {
    minHeight: theme.touchTarget,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    backgroundColor: theme.colors.surface,
  },
  selected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  selectedLabel: { color: theme.colors.surface, fontWeight: '600', fontSize: 12 },
  filterLabel: { color: theme.colors.primary, fontSize: 12 },
  pressed: { opacity: 0.75 },
  item: { flex: 1, minWidth: 0 },
  gridItem: { maxWidth: '50%' },
  columns: { gap: theme.spacing.medium },
  resultBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.small,
  },
  reviewNote: {
    flex: 1,
    minWidth: 160,
    flexDirection: 'row',
    gap: theme.spacing.small,
    alignItems: 'center',
  },
  reviewText: { flex: 1, color: theme.colors.warning },
  reset: { minHeight: theme.touchTarget, justifyContent: 'center' },
  resetLabel: { color: theme.colors.primary, fontWeight: '600' },
  footer: { gap: theme.spacing.large, marginTop: theme.spacing.large },
  comparePanel: {
    gap: theme.spacing.small,
    padding: theme.spacing.large,
    borderRadius: theme.radius.large,
    backgroundColor: theme.colors.primarySoft,
  },
  separator: { height: theme.spacing.medium },
  empty: {
    gap: theme.spacing.medium,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.large,
  },
});
