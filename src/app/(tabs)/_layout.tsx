import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export default function TabLayout() {
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
