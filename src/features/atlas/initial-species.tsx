import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { SpeciesCard } from '@/components/species-card';
import { mushrooms } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export function InitialSpecies() {
  return (
    <View style={styles.list}>
      <AppText variant="heading">{pl.atlas.initialSpecies}</AppText>
      {mushrooms.map((mushroom) => (
        <SpeciesCard key={mushroom.id} mushroom={mushroom} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: theme.spacing.medium },
});
