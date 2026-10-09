import { type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

type PageProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description: string;
}>;

export function Page({ eyebrow, title, description, children }: PageProps) {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.introduction}>
            {eyebrow ? <AppText variant="eyebrow">{eyebrow}</AppText> : null}
            <AppText accessibilityRole="header" variant="title">
              {title}
            </AppText>
            <AppText>{description}</AppText>
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1, padding: theme.spacing.large },
  content: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    gap: theme.spacing.extraLarge,
    paddingBottom: theme.spacing.medium,
  },
  introduction: { gap: theme.spacing.medium },
});
