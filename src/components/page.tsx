import { type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

type PageProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description: string;
  scientific?: boolean;
}>;

export function Page({ eyebrow, title, description, scientific = false, children }: PageProps) {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.introduction}>
            {eyebrow ? <AppText variant="eyebrow">{eyebrow}</AppText> : null}
            <AppText accessibilityRole="header" variant="title">
              {title}
            </AppText>
            <AppText style={scientific && styles.description}>{description}</AppText>
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1, padding: theme.layout.gutter },
  content: {
    width: '100%',
    maxWidth: theme.layout.readingWidth,
    alignSelf: 'center',
    gap: theme.spacing.large,
    paddingBottom: theme.spacing.medium,
  },
  introduction: { gap: theme.spacing.small, paddingTop: theme.spacing.small },
  description: { fontStyle: 'italic' },
});
