import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { EdibilityBadge } from '@/components/edibility-badge';
import { IconButton } from '@/components/icon-button';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { SearchField } from '@/components/search-field';
import { mushrooms, getMushroom, getPhoto } from '@/data/atlas';
import { thumbnailAssets } from '@/data/photo-assets';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import { queryMushrooms } from '@/utils/atlas-query';

type SpeciesSelectorProps = {
  label: string;
  selectedId?: string;
  excludedId?: string;
  onSelect: (id: string) => void;
};

export function SpeciesSelector({ label, selectedId, excludedId, onSelect }: SpeciesSelectorProps) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const selected = getMushroom(selectedId);
  const selectedPhoto = getPhoto(selected?.photoIds[0] ?? '');
  const matches = queryMushrooms(mushrooms, query);
  const close = () => setVisible(false);
  return (
    <View style={styles.section}>
      <AppText variant="eyebrow">{label}</AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selected?.polishName ?? pl.selection.choose}`}
        style={({ pressed }) => [
          styles.selection,
          selected && styles.selected,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          setQuery('');
          setVisible(true);
        }}
      >
        {selectedPhoto ? (
          <Image
            source={thumbnailAssets[selectedPhoto.id]}
            style={styles.thumbnail}
            contentFit="cover"
            accessible={false}
          />
        ) : (
          <View style={[styles.thumbnail, styles.add]}>
            <Ionicons name="add" size={28} color={theme.colors.primary} accessible={false} />
          </View>
        )}
        <View style={styles.copy}>
          <AppText style={styles.name}>{selected?.polishName ?? pl.selection.choose}</AppText>
          <AppText variant="caption" style={selected && styles.scientific}>
            {selected?.scientificName ?? pl.selection.chooseHint}
          </AppText>
        </View>
        <Ionicons name="chevron-down" size={20} color={theme.colors.primary} accessible={false} />
      </Pressable>
      <Modal visible={visible} onRequestClose={close} animationType="slide">
        <SafeAreaView style={styles.modal} accessibilityViewIsModal>
          <View style={styles.modalHeader}>
            <AppText variant="heading" accessibilityRole="header" style={styles.modalTitle}>
              {pl.selection.title}
            </AppText>
            <IconButton icon="close" label={pl.selection.cancel} onPress={close} />
          </View>
          <AppText variant="eyebrow">{label}</AppText>
          <SearchField label={pl.selection.search} value={query} onChangeText={setQuery} />
          <FlatList
            data={matches}
            keyExtractor={(mushroom) => mushroom.id}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <PlaceholderPanel
                icon="search-outline"
                title={pl.selection.empty}
                description={pl.atlas.noResultsDescription}
              />
            }
            renderItem={({ item }) => {
              const photo = getPhoto(item.photoIds[0] ?? '');
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${item.polishName}, ${item.scientificName}, ${pl.edibility[item.edibility]}${item.id === excludedId ? `, ${pl.selection.alreadySelected}` : ''}`}
                  accessibilityState={{
                    disabled: item.id === excludedId,
                    selected: item.id === selectedId,
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    item.id === selectedId && styles.selected,
                    item.id === excludedId && styles.disabled,
                    pressed && styles.pressed,
                  ]}
                  disabled={item.id === excludedId}
                  onPress={() => {
                    onSelect(item.id);
                    close();
                  }}
                >
                  {photo && (
                    <Image
                      source={thumbnailAssets[photo.id]}
                      style={styles.thumbnail}
                      contentFit="cover"
                      accessible={false}
                    />
                  )}
                  <View style={styles.copy}>
                    <AppText style={styles.name}>{item.polishName}</AppText>
                    <AppText variant="caption" style={styles.scientific}>
                      {item.scientificName}
                    </AppText>
                    <EdibilityBadge edibility={item.edibility} />
                    {item.id === excludedId && (
                      <AppText variant="caption">{pl.selection.alreadySelected}</AppText>
                    )}
                  </View>
                  {item.id === selectedId && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={theme.colors.primary}
                      accessible={false}
                    />
                  )}
                </Pressable>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { gap: theme.spacing.small, flex: 1 },
  selection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.medium,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 96,
  },
  selected: { borderColor: theme.colors.primary },
  thumbnail: {
    width: 60,
    height: 64,
    borderRadius: theme.radius.small,
    backgroundColor: theme.colors.primarySoft,
  },
  add: { alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, minWidth: 0, gap: 4 },
  name: { color: theme.colors.text, fontWeight: '600', fontSize: 16, lineHeight: 23 },
  scientific: { fontStyle: 'italic' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  disabled: { opacity: 0.5 },
  pressed: { backgroundColor: theme.colors.primarySoft },
  modal: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    gap: theme.spacing.medium,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.medium },
  modalTitle: { flex: 1 },
  list: { gap: theme.spacing.small, paddingBottom: theme.spacing.medium },
});
