# Atlas data maintenance

Dataset `0.7.0` contains 30 species, 66 source photographs, 66 thumbnails, and 12 curated pairs. Each species has two or three source photographs. All content is local; both image registries use static `require()` calls in `src/data/photo-assets.ts`.

## Files and rules

- `src/types/atlas.ts`: shared domain types.
- `src/data/metadata.json`: version, source references, and expert review status.
- `src/data/mushrooms.json`: Polish content with English field names and stable Latin-derived IDs.
- `src/data/photos.json`: captions, perspective/stage, attribution, source taxon, license links, modification notes, and SHA-256 hashes.
- `src/data/pairs.json`: two different species and aligned difference values. IDs use alphabetically sorted species IDs joined by `--`; the values follow the stored member order.
- `src/data/atlas.ts`: local lookups, including pair lookup in either order.

`reviewedAt` records the source-check date for a `source-checked` entry; it is not specialist approval. `expertReviewStatus` remains `pending`. Images were selected using Commons descriptions and visually inspected against the species descriptions. This is not independent mycological verification. Never upgrade review status without a recorded reviewer and review evidence.

Morphological descriptions use the 30 First Nature species pages listed in metadata, with relevant Polish public guidance. Polish season ranges for the initial bolete pair and death cap use the Lasy Państwowe guide; expanded ranges are approximate temperate-European ranges and explicitly qualified in the UI. Dates vary with weather and location. The guide is an older reference; do not assume every edibility claim elsewhere in it reflects current consensus. The atlas excludes taste-testing instructions. Conditional categories and conflicting sources are recorded in `docs/content-review.md` and in species/pair notes.

Scientific synonyms are recorded separately from Polish synonyms. A photograph's `sourceTaxon` must match its owner's scientific name or an explicitly recorded scientific synonym. This mapping is source evidence and still requires specialist review; category membership alone is not sufficient identification.

Similar-species records can mention a taxon not yet bundled, without a `mushroomId`. These are descriptive references, not broken links. When adding that taxon, populate its ID and validate its scientific and Polish names. Do not invent differences for undocumented pairs.

## Adding content and photos

1. Consult primary identification references and document the URLs, publisher, and access date.
2. Add complete species fields, meaningful photo captions, approximate months, and lookalike notes.
3. Select at least two distinct, identified images showing useful views/stages. Check the source description for disputed identification and arrange specialist review.
4. Download permitted image files into `assets/mushrooms/<photo-id>.jpg`. Record author, file page, original URL, license URL, and modifications. Preserve attribution for derivatives and the applicable share-alike license. Full metadata is in `photos.json`; an attribution inventory is in `docs/photo-credits.md`.
5. Compute `Get-FileHash <path> -Algorithm SHA256`, record the lowercase hash, and reference the photo IDs from its species. Run `npm run prepare:photos` to generate thumbnails and both literal import registries. It checks original hashes, applies EXIF orientation, fits within 480 × 480 pixels without cropping or enlargement, removes metadata, and encodes JPEG at quality 80. Source assets are preserved. The pinned Sharp version and lockfile define the processing toolchain; review regenerated hash changes after dependency updates.
6. Increment the dataset version consistently in metadata and all entries; record source checks separately from expert review.
7. Run `npm run prepare:review` to regenerate photograph credits. Existing specialist review documents are preserved; update their inventory manually when the dataset changes. Keep authors, licenses, modifications, and source/thumbnail hashes with every redistributed image.
8. Format the generated files with `npx prettier src/data/photos.json src/data/photo-assets.ts docs/photo-credits.md --write`. Run `npm run check`, `npm run export:android`, and `npm run verify:android`. Inspect the pictures and relevant screens. Keep unresolved content and native review items visible in acceptance reports.

The current source photographs total 23,778,549 bytes; thumbnails total 3,043,828 bytes, approximately 87% smaller. Atlas cards and comparison use thumbnails; galleries use the larger source files. This reduces list image decoding and transfer size in previews; native responsiveness has not yet been measured.

Exports validate data first. Native first-launch offline acceptance requires an installable standalone build, not Metro or an exported JavaScript bundle. It remains pending until native validation is available.
