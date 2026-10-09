import { useState } from 'react';
import { FlatList, Modal, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { mushrooms, getMushroom } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

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
  const matches = mushrooms.filter((mushroom) =>
    [mushroom.polishName, mushroom.scientificName, ...mushroom.synonyms].some((name) =>
      name.toLocaleLowerCase('pl').includes(query.trim().toLocaleLowerCase('pl')),
    ),
  );
  const close = () => setVisible(false);
  return (
    <View style={styles.section}>
      <AppText variant="heading">{label}</AppText>
      <Button
        label={selected?.polishName ?? pl.selection.choose}
        secondary
        onPress={() => {
          setQuery('');
          setVisible(true);
        }}
      />
      <Modal visible={visible} onRequestClose={close} animationType="slide">
        <SafeAreaView style={styles.modal} accessibilityViewIsModal>
          <AppText variant="heading" accessibilityRole="header">
            {pl.selection.title}
          </AppText>
          <TextInput
            accessibilityLabel={pl.selection.search}
            placeholder={pl.selection.search}
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            autoCorrect={false}
          />
          <FlatList
            data={matches}
            keyExtractor={(mushroom) => mushroom.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
            ListEmptyComponent={<AppText>{pl.selection.empty}</AppText>}
            renderItem={({ item }) => (
              <Button
                label={`${item.polishName} · ${item.scientificName}${item.id === excludedId ? ` · ${pl.selection.alreadySelected}` : ''}`}
                secondary
                disabled={item.id === excludedId}
                onPress={() => {
                  onSelect(item.id);
                  close();
                }}
              />
            )}
          />
          <Button label={pl.selection.cancel} onPress={close} />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { gap: theme.spacing.small },
  modal: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.medium,
  },
  input: {
    minHeight: theme.touchTarget,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.medium,
    padding: theme.spacing.medium,
    fontSize: 16,
    color: theme.colors.text,
  },
  list: { gap: theme.spacing.small, paddingBottom: theme.spacing.medium },
});
