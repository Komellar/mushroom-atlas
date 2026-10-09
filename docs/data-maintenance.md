# Atlas data maintenance

The initial dataset contains five species, three photographs each, and one curated pair. All content is local; image sources are static `require()` calls in `src/data/photo-assets.ts`.

## Files and rules

- `src/types/atlas.ts`: shared domain types.
- `src/data/metadata.json`: version, source references, and expert review status.
- `src/data/mushrooms.json`: Polish content with English field names and stable Latin-derived IDs.
- `src/data/photos.json`: captions, perspective/stage, attribution, source taxon, license links, modification notes, and SHA-256 hashes.
- `src/data/pairs.json`: two different species and aligned difference values. IDs use alphabetically sorted species IDs joined by `--`; the values follow the stored member order.
- `src/data/atlas.ts`: local lookups, including pair lookup in either order.

`reviewedAt` records the source-check date for a `source-checked` entry; it is not specialist approval. `expertReviewStatus` remains `pending`. Images were selected using Commons descriptions and visually inspected against the species descriptions. This is not independent mycological verification. Never upgrade review status without a recorded reviewer and review evidence.

Initial morphological descriptions use the five First Nature species pages listed in metadata. Polish season ranges for the bolete pair and death cap use the Lasy Państwowe guide; other ranges are approximate temperate-climate ranges. Dates vary with weather and location. The guide is an older reference; do not assume every edibility claim elsewhere in it reflects current consensus. The atlas excludes taste-testing instructions.

Similar-species records can mention a taxon not yet bundled, without a `mushroomId`. These are descriptive references, not broken links. When adding that taxon, populate its ID and validate its scientific and Polish names. Do not invent differences for undocumented pairs.

## Adding content and photos

1. Consult primary identification references and document the URLs, publisher, and access date.
2. Add complete species fields, meaningful photo captions, approximate months, and lookalike notes.
3. Select at least two distinct, identified images showing useful views/stages. Check the source description for disputed identification and arrange specialist review.
4. Download permitted image files into `assets/mushrooms/<photo-id>.jpg`. Record author, file page, original URL, license URL, and modifications. Preserve attribution for derivatives and the applicable share-alike license. Full metadata is in `photos.json`; an attribution inventory is in `docs/photo-credits.md`.
5. Compute `Get-FileHash <path> -Algorithm SHA256`, record the lowercase hash, add a literal import to `photo-assets.ts`, and reference the photo IDs from its species.
6. Increment the dataset version consistently in metadata and all entries; record source checks separately from expert review.
7. Run `npm run check` and platform exports. Inspect the pictures and relevant screens. Keep unresolved content and native review items visible in acceptance reports.

Exports validate data first. Native first-launch offline acceptance requires an installable standalone build, not Metro or an exported JavaScript bundle. It remains pending until native validation is available.
