import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { IconButton } from '@/components/icon-button';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export function SearchField({
  value,
  onChangeText,
  label,
  placeholder = label,
}: {
  value: string;
  onChangeText: (value: string) => void;
  label: string;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.field, focused && styles.focused]}>
      <Ionicons name="search-outline" size={22} color={theme.colors.muted} accessible={false} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        selectionColor={theme.colors.primary}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.input}
      />
      {value.length > 0 && (
        <IconButton icon="close" label={pl.atlas.clearSearch} onPress={() => onChangeText('')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    paddingLeft: theme.spacing.medium,
    paddingRight: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.surface,
  },
  focused: { borderColor: theme.colors.primary },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    paddingVertical: theme.spacing.medium,
    fontSize: 16,
    color: theme.colors.text,
  },
});
