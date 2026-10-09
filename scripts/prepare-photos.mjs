import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const photos = JSON.parse(await readFile(new URL('src/data/photos.json', root), 'utf8'));
await mkdir(new URL('assets/mushrooms/thumbnails/', root), { recursive: true });
let originalBytes = 0;
let thumbnailBytes = 0;
for (const photo of photos) {
  const input = await readFile(new URL(photo.assetPath, root));
  if (createHash('sha256').update(input).digest('hex') !== photo.sha256)
    throw new Error(`Source asset hash mismatch: ${photo.id}`);
  const output = await sharp(input)
    .autoOrient()
    .resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
  photo.thumbnailPath = `assets/mushrooms/thumbnails/${photo.id}.jpg`;
  photo.thumbnailSha256 = createHash('sha256').update(output).digest('hex');
  photo.thumbnailModifications =
    'Resized to fit within 480 × 480 pixels without cropping, EXIF orientation applied, metadata removed, JPEG quality 80.';
  await writeFile(new URL(photo.thumbnailPath, root), output);
  originalBytes += input.length;
  thumbnailBytes += output.length;
}
const importRows = (key) =>
  photos.map((photo) => `  '${photo.id}': require('../../${photo[key]}'),`).join('\n');
const registry = `import type { ImageSourcePropType } from 'react-native';\n\n// Literal imports ensure all photographs and thumbnails are bundled offline.\nexport const photoAssets: Record<string, ImageSourcePropType> = {\n${importRows('assetPath')}\n};\n\nexport const thumbnailAssets: Record<string, ImageSourcePropType> = {\n${importRows('thumbnailPath')}\n};\n`;
await writeFile(new URL('src/data/photos.json', root), JSON.stringify(photos, null, 2) + '\n');
await writeFile(new URL('src/data/photo-assets.ts', root), registry);
console.log(
  `Prepared ${photos.length} thumbnails: ${thumbnailBytes} bytes, compared with ${originalBytes} source bytes.`,
);
console.log(`Registry: ${fileURLToPath(new URL('src/data/photo-assets.ts', root))}`);
