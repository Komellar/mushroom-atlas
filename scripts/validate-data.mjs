import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { validateAtlas } from './atlas-validation.mjs';

const root = new URL('../', import.meta.url);
const readJson = async (name) =>
  JSON.parse(await readFile(new URL(`src/data/${name}.json`, root), 'utf8'));
const [metadata, mushrooms, photos, pairs] = await Promise.all(
  ['metadata', 'mushrooms', 'photos', 'pairs'].map(readJson),
);
const errors = validateAtlas({ metadata, mushrooms, photos, pairs });
const registry = await readFile(new URL('src/data/photo-assets.ts', root), 'utf8');
for (const photo of photos) {
  try {
    const bytes = await readFile(new URL(photo.assetPath, root));
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes.length < 1024)
      errors.push(`${photo.id}: invalid JPEG`);
    if (createHash('sha256').update(bytes).digest('hex') !== photo.sha256)
      errors.push(`${photo.id}: asset hash mismatch`);
    const literal = `'${photo.id}': require('../../${photo.assetPath}')`;
    if (!registry.includes(literal)) errors.push(`${photo.id}: missing static asset import`);
    await stat(fileURLToPath(new URL(photo.assetPath, root)));
  } catch (error) {
    errors.push(`${photo.id}: ${error.message}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Validated dataset ${metadata.version}: ${mushrooms.length} species, ${photos.length} local photos, ${pairs.length} curated pairs. Expert review: ${metadata.expertReviewStatus}.`,
  );
}
