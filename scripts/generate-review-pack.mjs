import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const load = async (name) =>
  JSON.parse(await readFile(new URL(`src/data/${name}.json`, root), 'utf8'));
const [metadata, species, photos] = await Promise.all(
  ['metadata', 'mushrooms', 'photos'].map(load),
);
const creditRows = photos.map(
  (photo) =>
    `## ${photo.id}\n\nAuthor: ${photo.author}.\n\n[Source file](<${photo.sourceUrl}>) · [${photo.license}](<${photo.licenseUrl}>).\n\n${photo.modifications} Source SHA-256: \`${photo.sha256}\`.\n\nThumbnail: ${photo.thumbnailModifications} Thumbnail SHA-256: \`${photo.thumbnailSha256}\`.\n`,
);
await writeFile(
  new URL('docs/photo-credits.md', root),
  '# Photograph attribution inventory\n\nAll images and thumbnails are bundled locally. Source metadata and license links were checked on 2026-10-09. Source identification and visual screening do not replace independent mycological review.\n\nLicenses apply individually to each photograph and its derived thumbnail. Keep source, attribution, license, and modification information when redistributing images.\n\n' +
    creditRows.join('\n'),
);
const rows = species.map(
  (item) =>
    `| ${item.id} | ${item.scientificName} | ${item.edibility} | ${item.photoIds.length} | Source checked; expert pending |`,
);
const reviewDocument = `# Independent content review\n\nDataset ${metadata.version}, prepared 2026-10-09. Status: pending. No reviewer or independent sign-off is recorded. No reviewer has been contacted by this implementation task.\n\n## Review inventory\n\n| ID | Scientific name | Proposed category | Photos | Review status |\n| --- | --- | --- | --- | --- |\n${rows.join('\n')}\n\n## Required review\n\nReview every Polish description, proposed category and qualification, months, lookalike reference, and pair difference against current Polish mycological sources. Review each source photograph at full resolution, including its original source page and taxonomic identity. Use the JSON IDs to record corrections.\n\nFor each entry and photo, record reviewer name, qualification, date, decision, changes, and evidence. Only then change the relevant status to expert-reviewed. Global expertReviewStatus must remain pending until all species, photos, and curated pairs have independent approval.\n\n## Items requiring particular attention\n\n- Conditional edibility: Amanita rubescens, Armillaria mellea, and Kuehneromyces mutabilis. Raw toxicity, individual adverse reactions, and dangerous lookalikes are explicit in notes; a category badge cannot establish food safety.\n- Conflicting edibility assessments: Chlorophyllum rhacodes is marked poisonous with a qualification explaining source disagreement. Hygrophoropsis aurantiaca is treated as inedible under the First Nature recommendation. Confirm the proposed terminology for a Polish audience.\n- Taxonomic groups: Leccinum, Russula, Armillaria, and Chlorophyllum can require microscopy. Source labels and visual resemblance are preliminary evidence, not a diagnostic conclusion.\n- Galerina marginata versus Kuehneromyces mutabilis: neither substrate nor visible stem texture gives a guaranteed distinction. The comparison note says microscopy may be required.\n- Occurrence ranges for expanded entries are approximate temperate-European source ranges, not a measured Polish regional calendar. Local timing, winter exceptions, and tree associations need review.\n- Initial source records use accepted synonyms where file labels use older names, including Boletus badius and Macrolepiota rhacodes. Confirm every mapping and avoid extending a synonym to a lookalike.\n- Some sources have inconsistent detail: First Nature and public Polish guidance differ on milk-colour progression in Lactarius deliciosus and drying patterns in Kuehneromyces. The atlas omits absolute claims about those disputed progressions. Older guides also contain edibility claims that should not be generalized to species outside this dataset.\n- Some photograph sets show the same specimen in different views. Some omit an exposed stem base or cross-section; captions identify visible limitations. Request additional photographs if the set does not adequately illustrate the species.\n\n## Sign-off record\n\nReviewer: pending. Qualification: pending. Review date: pending. Decisions and unresolved corrections: pending.\n\nThis review pack is preparation for review; it does not establish that review was arranged or completed.\n`;
console.log('Generated photograph credits and the pending specialist review inventory.');

try {
  await writeFile(new URL('docs/content-review.md', root), reviewDocument, { flag: 'wx' });
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.log('Preserved existing content review document.');
}
