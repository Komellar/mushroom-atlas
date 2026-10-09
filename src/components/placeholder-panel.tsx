import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

type PlaceholderPanelProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
};

export function PlaceholderPanel({ icon, title, description }: PlaceholderPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={32} color={theme.colors.primary} accessible={false} />
      </View>
      <AppText accessibilityRole="header" variant="heading">
        {title}
      </AppText>
      <AppText>{description}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    padding: theme.spacing.large,
    gap: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.large,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
