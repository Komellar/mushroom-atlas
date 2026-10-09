import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const exportRoot = resolve(fileURLToPath(new URL('dist/android/', root)));
const metadata = JSON.parse(await readFile(resolve(exportRoot, 'metadata.json'), 'utf8'));
const android = metadata.fileMetadata?.android;
assert(android?.bundle && android.assets?.length, 'Android export metadata is missing.');
const assetPath = (relative) => {
  const path = resolve(exportRoot, relative.replaceAll('\\', '/'));
  assert(path.startsWith(exportRoot + sep), 'Export path escapes its directory.');
  return path;
};
assert((await readFile(assetPath(android.bundle))).length > 0, 'Android bundle is empty.');
const hashes = new Set();
let bytes = 0;
for (const asset of android.assets) {
  const buffer = await readFile(assetPath(asset.path));
  assert(buffer.length > 0, `Empty export asset: ${asset.path}`);
  hashes.add(createHash('sha256').update(buffer).digest('hex'));
  bytes += buffer.length;
}
const photos = JSON.parse(await readFile(new URL('src/data/photos.json', root), 'utf8'));
for (const photo of photos) {
  assert(hashes.has(photo.sha256), `Photo missing from Android export: ${photo.id}`);
  assert(hashes.has(photo.thumbnailSha256), `Thumbnail missing from Android export: ${photo.id}`);
}
assert(
  android.assets.some((asset) => asset.ext === 'ttf'),
  'Bundled icon fonts are missing.',
);
console.log(
  `Android export verified: ${photos.length} photographs and ${photos.length} thumbnails match SHA-256; ${android.assets.length} declared assets (${bytes} bytes) and the bundle are present.`,
);
console.log(
  'This verifies export contents; standalone first-launch offline validation remains a device check.',
);
