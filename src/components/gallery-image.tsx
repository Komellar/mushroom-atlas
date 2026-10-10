import { Image, type ImageRef } from 'expo-image';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { photoAssets, thumbnailAssets } from '@/data/photo-assets';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { MushroomPhoto } from '@/types/atlas';

export function GalleryImage({
  photo,
  preloaded,
  style,
  onPress,
}: {
  photo: MushroomPhoto;
  preloaded?: ImageRef;
  style: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  // Keep the source stable if background preloading finishes during a visible load.
  const [source] = useState(() => preloaded ?? photoAssets[photo.id]);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  return (
    <View style={[styles.frame, style]} accessibilityState={{ busy: status === 'loading' }}>
      <Image
        key={attempt}
        source={source}
        placeholder={thumbnailAssets[photo.id]}
        placeholderContentFit="contain"
        accessibilityLabel={photo.caption}
        style={StyleSheet.absoluteFill}
        contentFit="contain"
        loading="eager"
        cachePolicy="memory-disk"
        onDisplay={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      {onPress && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={pl.photos.enlarge}
        />
      )}
      {status === 'loading' && (
        <View pointerEvents="none" style={styles.overlay}>
          <View style={styles.message} accessibilityLiveRegion="polite">
            <ActivityIndicator color={theme.colors.primary} size="large" />
            <AppText>{pl.photos.loading}</AppText>
          </View>
        </View>
      )}
      {status === 'error' && (
        <View style={[styles.overlay, styles.error]}>
          <AppText accessibilityLiveRegion="polite">{pl.photos.loadError}</AppText>
          <Button
            label={pl.photos.retry}
            secondary
            onPress={() => {
              setStatus('loading');
              setAttempt((value) => value + 1);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: 'hidden' },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.small,
    gap: theme.spacing.small,
  },
  message: {
    alignItems: 'center',
    gap: theme.spacing.small,
    padding: theme.spacing.small,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.surface,
  },
  error: { backgroundColor: theme.colors.primarySoft },
});
