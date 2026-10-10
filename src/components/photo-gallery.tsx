import { Image, type ImageRef } from 'expo-image';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Disclosure } from '@/components/disclosure';
import { ExternalReference } from '@/components/external-reference';
import { GalleryImage } from '@/components/gallery-image';
import { IconButton } from '@/components/icon-button';
import { getPhoto } from '@/data/atlas';
import { photoAssets, thumbnailAssets } from '@/data/photo-assets';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { MushroomPhoto } from '@/types/atlas';

function PhotoCaption({ photo }: { photo: MushroomPhoto }) {
  return (
    <View style={styles.caption}>
      <AppText style={styles.description}>{photo.caption}</AppText>
      <AppText variant="caption">{`${pl.photos.author}: ${photo.author} · ${photo.license === 'Public domain' ? pl.photos.publicDomain : photo.license}`}</AppText>
      <Disclosure key={photo.id} title={pl.photos.attribution} compact>
        <View style={styles.references}>
          <ExternalReference url={photo.sourceUrl} label={pl.photos.source} />
          <ExternalReference
            url={photo.licenseUrl}
            label={`${pl.photos.license}: ${photo.license === 'Public domain' ? pl.photos.publicDomain : photo.license}`}
          />
        </View>
        {photo.downloadUrl.includes('/thumb/') && (
          <AppText variant="caption">{pl.photos.resized}</AppText>
        )}
      </Disclosure>
    </View>
  );
}

export function PhotoGallery({ photoIds }: { photoIds: string[] }) {
  const [selected, setSelected] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const [preloaded, setPreloaded] = useState<Record<string, ImageRef>>({});

  useEffect(() => {
    let active = true;
    // Load the remaining bundled photos before navigation needs them. Keep decoded
    // references only for this gallery, so visiting the atlas does not preload it all.
    for (const photoId of photoIds.slice(1)) {
      const source = photoAssets[photoId];
      if (source === undefined) continue;
      void Image.loadAsync(source)
        .then((image) => {
          if (active) setPreloaded((current) => ({ ...current, [photoId]: image }));
        })
        .catch(() => {
          // The visible image handles errors and lets the user retry.
        });
    }
    return () => {
      active = false;
    };
  }, [photoIds]);

  const photo = getPhoto(photoIds[selected] ?? '');
  if (!photo) return null;
  const controls = (
    <View style={styles.controls}>
      <IconButton
        icon="chevron-back"
        label={pl.photos.previous}
        disabled={selected === 0}
        onPress={() => setSelected((value) => Math.max(0, value - 1))}
      />
      <AppText
        style={styles.counter}
        accessibilityLiveRegion="polite"
      >{`${selected + 1} / ${photoIds.length}`}</AppText>
      <IconButton
        icon="chevron-forward"
        label={pl.photos.next}
        disabled={selected === photoIds.length - 1}
        onPress={() => setSelected((value) => Math.min(photoIds.length - 1, value + 1))}
      />
    </View>
  );
  return (
    <View style={styles.gallery}>
      <AppText variant="heading" accessibilityRole="header">
        {pl.photos.gallery}
      </AppText>
      <View>
        <GalleryImage
          key={photo.id}
          photo={photo}
          preloaded={preloaded[photo.id]}
          style={styles.image}
          onPress={() => setEnlarged(true)}
        />
      </View>
      <View style={styles.thumbnailStrip}>
        {photoIds.map((id, index) => {
          const item = getPhoto(id);
          if (!item) return null;
          return (
            <Pressable
              key={id}
              onPress={() => setSelected(index)}
              accessibilityRole="button"
              accessibilityLabel={`${pl.photos.select} ${index + 1}: ${item.caption}`}
              accessibilityState={{ selected: index === selected }}
              style={[styles.thumbnail, index === selected && styles.selectedThumbnail]}
            >
              <Image
                source={thumbnailAssets[id]}
                contentFit="contain"
                style={styles.thumbnailImage}
                accessible={false}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.toolbar}>
        {controls}
        <Button
          label={pl.photos.enlarge}
          icon="expand-outline"
          secondary
          onPress={() => setEnlarged(true)}
        />
      </View>
      <PhotoCaption photo={photo} />
      <Modal visible={enlarged} onRequestClose={() => setEnlarged(false)} animationType="fade">
        <SafeAreaView style={styles.modal} accessibilityViewIsModal>
          <Button
            label={pl.photos.close}
            icon="close-outline"
            secondary
            onPress={() => setEnlarged(false)}
          />
          <ScrollView contentContainerStyle={styles.modalContent}>
            <GalleryImage
              key={photo.id}
              photo={photo}
              preloaded={preloaded[photo.id]}
              style={styles.largeImage}
            />
            {controls}
            <PhotoCaption photo={photo} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  gallery: { gap: theme.spacing.medium },
  image: {
    width: '100%',
    aspectRatio: 1.3,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radius.medium,
  },
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.small,
  },
  thumbnailStrip: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.small },
  thumbnail: {
    width: 72,
    height: 60,
    padding: 3,
    borderRadius: theme.radius.small,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  selectedThumbnail: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
  },
  thumbnailImage: { width: '100%', height: '100%', borderRadius: 8 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  counter: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    minWidth: 40,
    textAlign: 'center',
  },
  caption: { gap: theme.spacing.small },
  description: { fontSize: 14, lineHeight: 22 },
  references: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.medium },
  modal: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    gap: theme.spacing.medium,
  },
  modalContent: { gap: theme.spacing.medium, paddingBottom: theme.spacing.large },
  largeImage: { width: '100%', aspectRatio: 0.85 },
});
