import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export default function TabLayout() {
  const { fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerTintColor: theme.colors.primary,
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTitleStyle: { fontWeight: '600' },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          minHeight: 64,
          height: 64 + 16 * Math.max(0, fontScale - 1) + insets.bottom,
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: pl.appName,
          tabBarLabel: pl.navigation.atlas,
          tabBarAccessibilityLabel: pl.navigation.atlas,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="compare"
        options={{
          title: pl.navigation.comparison,
          tabBarAccessibilityLabel: pl.navigation.comparison,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="git-compare-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
