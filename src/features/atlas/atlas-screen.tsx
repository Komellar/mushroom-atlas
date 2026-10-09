import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionLink } from '@/components/action-link';
import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { SafetyNotice } from '@/components/safety-notice';
import { SpeciesCard } from '@/components/species-card';
import { mushrooms } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { Mushroom } from '@/types/atlas';
import { type EdibilityFilter, queryMushrooms } from '@/utils/atlas-query';
import { atlasState } from './atlas-state';
const filters: EdibilityFilter[] = ['all', 'edible', 'inedible', 'poisonous'];
export default function AtlasScreen() {
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
        ref={list}
        data={results}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        onScroll={(event) => {
          atlasState.offset = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={32}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <SpeciesCard mushroom={item} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <AppText variant="eyebrow">{pl.atlas.eyebrow}</AppText>
            <AppText variant="title" accessibilityRole="header">
              {pl.atlas.title}
            </AppText>
            <AppText>{pl.atlas.description}</AppText>
            <SafetyNotice />
            <TextInput
              value={query}
              onChangeText={(value) => update(value, filter)}
              placeholder={pl.atlas.search}
              accessibilityLabel={pl.atlas.search}
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
            <View style={styles.filters}>
              {filters.map((value) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: value === filter }}
                  onPress={() => update(query, value)}
                  style={[styles.filter, value === filter && styles.selected]}
                >
                  <AppText style={value === filter ? styles.selectedLabel : styles.filterLabel}>
                    {value === 'all' ? pl.atlas.all : pl.edibility[value]}
                  </AppText>
                </Pressable>
              ))}
            </View>
            <AppText accessibilityLiveRegion="polite">{`${pl.atlas.results}: ${results.length}`}</AppText>
            {results.length > 0 && (query.length > 0 || filter !== 'all') && (
              <Button label={pl.atlas.clear} secondary onPress={() => update('', 'all')} />
            )}
            <ActionLink href="/compare" label={pl.atlas.comparisonAction} secondary />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppText variant="heading">{pl.atlas.noResults}</AppText>
            <AppText>{pl.atlas.noResultsDescription}</AppText>
            <Button label={pl.atlas.clear} onPress={() => update('', 'all')} />
          </View>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  list: {
    padding: theme.spacing.medium,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: theme.spacing.large,
  },
  header: { gap: theme.spacing.medium, marginBottom: theme.spacing.large },
  input: {
    minHeight: theme.touchTarget,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.medium,
    padding: theme.spacing.medium,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.small },
  filter: {
    minHeight: theme.touchTarget,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  selected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  selectedLabel: { color: theme.colors.surface, fontWeight: '600' },
  filterLabel: { color: theme.colors.primary },
  separator: { height: theme.spacing.medium },
  empty: { gap: theme.spacing.medium },
});
