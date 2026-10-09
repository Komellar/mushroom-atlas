# Mushroom Atlas — Implementation Plan

Project location: `C:\projects\mushroom-atlas`.

## Product scope and conventions

- Build a simple React Native mobile atlas of common mushroom species found in Poland.
- Include 20–40 species in the first release, targeting approximately 30.
- Focus on the atlas, species details, and comparison of two species.
- Use Polish for app UI and displayed atlas content. Scientific names remain Latin.
- Use English for all other project material: README, documentation, plans, reports, file names, code identifiers, types, JSON keys, comments, commit messages, and developer-facing messages.
- Use Expo, TypeScript, and Expo Router, with Android as the first validation platform and an architecture that can also support iOS.
- Store data in static JSON files and bundle required photographs locally. The core experience must work offline from the first launch after installation.
- Keep accounts, an application backend, automatic photo recognition, and app-store publication outside this implementation scope.

## Current status and sequencing

| Phase                                    | Status                                                       |
| ---------------------------------------- | ------------------------------------------------------------ |
| 1 — Project foundation                   | Development implemented; native validation pending           |
| 2 — Data model and initial species       | Development implemented; native/content review pending       |
| 3 — UI design and shared components      | Development implemented; native accessibility checks pending |
| 4 — Atlas, search, and filters           | Development implemented; native validation pending           |
| 5 — Species details                      | Development implemented; native/content review pending       |
| 6 — Comparison                           | Development implemented; native/content review pending       |
| 7 — Complete content and offline support | Planned                                                      |
| 8 — Validation and installable release   | Planned                                                      |

Emulator-dependent checks are deferred at the user's request. Do not install or launch an emulator until the user is ready. Subsequent data and code work can proceed independently if requested; native validation remains an acceptance requirement.

## Phase 1 — Project foundation

1. Create the project in `C:\projects\mushroom-atlas`.
2. Configure Expo, React Native, strict TypeScript, and a local Git repository.
3. Configure ESLint, Prettier, and commands for type, lint, and formatting checks.
4. Create the directory structure:
   - `src/app` for routes and navigation;
   - `src/components` for shared UI;
   - `src/features` for atlas, details, and comparison screens;
   - `src/data`, `src/types`, and `src/utils` for data and domain logic;
   - `src/locales` for Polish UI strings;
   - `src/theme` for design tokens;
   - `assets/mushrooms` for bundled photographs;
   - `scripts` for data validation;
   - `docs` for English project documentation.
5. Add atlas and comparison tabs, a species details route, and recovery screens.
6. Verify code checks, Expo configuration, bundle exports, and browser navigation.
7. When the emulator is ready, verify Android startup, navigation, system back behavior, and safe areas. Perform a physical-device check when a device is available.

**Acceptance:** the app launches with Polish UI and working navigation. Development is implemented; native launch validation remains pending.

Acceptance rerun on 2026-10-09: code checks, Android bundle export, and browser launch/navigation checks passed. See [the Phase 1 acceptance report](acceptance/phase-1.md). Native acceptance remains pending.

## Phase 2 — Data model and initial species dataset

1. Define a shared `Mushroom` model with English field names:
   - stable `id`, `polishName`, `scientificName`, and optional `synonyms`;
   - `edibility` using `edible`, `inedible`, or `poisonous`, mapped to Polish UI labels;
   - `keyFeatures` and `identificationTips`;
   - descriptions of the cap, stem, hymenophore, flesh color, and reactions to damage;
   - habitat information and occurrence months;
   - references to similar species;
   - photograph identifiers, Polish captions, perspective/development-stage metadata, authors, sources, and licenses;
   - content references, dataset version, and review date.
2. Define a model for curated differences between specific pairs, using stable species identifiers and consistent pair lookup.
3. Prepare five complete entries covering all three edibility categories and at least one similar-species pair.
4. Include at least two or three correctly identified photographs per species, showing different perspectives and stages of development.
5. Map photo identifiers to static local asset imports rather than dynamically constructed asset paths.
6. Validate unique identifiers, required fields, month values, category values, photo metadata, asset existence, and species references.
7. Verify that the initial data and photographs are included in a standalone build; perform the offline device check once the environment is available.

**Acceptance:** a consistent, validated dataset can supply the atlas, details, and comparison screens. Required assets are bundled locally.

Development acceptance on 2026-10-09: five sourced entries, 15 local photographs, one curated pair, and data validation passed. All photo hashes were found in the Android export. See [the Phase 2 acceptance report](acceptance/phase-2.md). Standalone offline and specialist review remain pending.

## Phase 3 — UI design and shared components

1. Design layouts for the atlas, details, species selection, and comparison.
2. Define typography, colors, spacing, touch targets, and a simple visual identity.
3. Show edibility using text, an icon, and color so that meaning does not rely on color alone.
4. Build shared species cards, edibility badges, image galleries, feature lists, and occurrence-month components.
5. Place edibility and key identifying features at the top of the details screen.
6. Check small-screen layouts and larger system font sizes, using browser previews where useful and native checks when available.

**Acceptance:** the main information is easy to scan and controls remain readable and usable on small screens.

Development acceptance on 2026-10-09: shared UI, screen layout specifications, details foundation, and selector controls passed browser checks at 320 × 568. See [the Phase 3 acceptance report](acceptance/phase-3.md). Native large-font and safe-area checks remain pending.

## Phase 4 — Atlas, search, and filters

1. Display a list with a photograph, Polish name, and clear edibility badge for each species.
2. Search Polish names, scientific names, and synonyms.
3. Normalize case, surrounding whitespace, and Polish diacritics, including an explicit mapping for the Polish stroked L character.
4. Add filters for all species, edible, inedible, and poisonous species, with Polish labels.
5. Combine search and filtering; sort results by Polish name using Polish alphabetical ordering.
6. Add an empty-results state and controls to clear the search and filters.
7. Preserve the query, selected filter, and list position when returning from species details.

**Acceptance:** users can find and filter species quickly, with all processing performed locally.

Development acceptance on 2026-10-09: local search, combined category filters, Polish sorting, empty/reset behavior, and query/filter/scroll restoration passed automated and browser checks. See [the Phase 4 acceptance report](acceptance/phase-4.md).

## Phase 5 — Species details

1. Show the Polish name, scientific name, edibility, and main photograph.
2. Add a local photograph gallery with enlargement and captions explaining visible features.
3. Display a short list of key identifying features immediately below the header.
4. Add detailed sections for the cap, stem, gills or pores, flesh color, and reactions to damage.
5. Show typical habitat and occurrence months, with relevant variability explained in the content.
6. List similar species with their most important differences and links to their details.
7. Add actions to start a comparison and directly compare a listed similar species.
8. Make content references and photo credits available within the app.

**Acceptance:** every species page contains the requested information, prioritizes the key facts, and links directly to comparison.

Development acceptance on 2026-10-09: all five bundled species render complete detail sections, galleries/credits, sources, and comparison links with preselection. See [the Phase 5 acceptance report](acceptance/phase-5.md). Native and specialist review remain pending.

## Phase 6 — Two-species comparison

1. Add searchable selection for two species.
2. Support entry from the atlas and from a details page with the first species preselected.
3. Prevent selecting the same species in both slots.
4. Show the photographs and names in two columns.
5. Build aligned comparison rows for edibility, cap, stem, flesh and color changes, gills or pores, habitat, occurrence period, and key features.
6. Use shared vertical scrolling and aligned row heights to keep matching features beside each other; keep species identity clear while scrolling.
7. Show curated key differences near the top for documented pairs. Other pairs still receive the full feature comparison; do not invent pair-specific conclusions.
8. Allow swapping columns and replacing either selected species.

**Acceptance:** any two different species can be compared offline, and documented similar pairs have prominent, verified differences.

Development acceptance on 2026-10-09: all ten bundled pairs rendered complete aligned comparisons, and selection, replacement, swapping, duplicate prevention, and ordered curated lookup passed browser/automated checks. See [the Phase 6 acceptance report](acceptance/phase-6.md). Native offline and specialist verification remain pending.

## Phase 7 — Complete content and offline support

1. Expand the dataset to approximately 30 species, remaining within the 20–40 species scope.
2. Include common species and important lookalikes, especially poisonous species relevant to the comparisons.
3. Complete descriptions, similar-species references, pair differences, and at least two or three photographs per entry.
4. Verify species identification in photographs, information sources, author credits, and usage licenses.
5. Arrange a mycological review of descriptions, edibility categories, and distinguishing features. Record any unresolved review items honestly.
6. Optimize images and create smaller thumbnails for list performance.
7. Bundle all required data, photographs, icons, and fonts; the core experience must not require a previous download or a populated cache.
8. Version the dataset and document the process for updating content through application releases.
9. Include concise Polish guidance explaining the atlas's role and directing users to expert consultation when identification is uncertain.

**Acceptance:** the complete dataset and required photographs are available from the first offline launch, with documented content verification and asset rights.

## Phase 8 — Validation, optimization, and installable release

1. Run automated checks for data completeness, image references, and similar-species/pair integrity.
2. Test search normalization, combined filters, two-species selection, pair lookup regardless of column order, and rejection of identical selections.
3. Verify the full flow: atlas → details → similar species → comparison → atlas.
4. Check Android navigation, system back behavior, safe areas, small screens, scrolling, and larger font sizes.
5. Prepare a standalone installable build and test its first launch in airplane mode. Check every species, all photographs, comparison, and restart behavior.
6. Measure startup time, list responsiveness, and installation size; optimize based on observed problems and record the test device.
7. Recheck compatible dependency updates and npm audit findings; document and assess unresolved items before production release.
8. Prepare an Android APK for installation and testing, with a reproducible build procedure.
9. Complete English documentation for setup, adding species and photographs, validation, and release preparation.
10. If iOS is included in the first release, prepare the corresponding build and perform separate iPhone validation.

**Acceptance:** an installable, tested release contains the complete offline atlas, detailed species pages, and comparison. Native validation and content review are explicitly recorded.

## First-release completion criteria

- 20–40 complete species entries, targeting approximately 30.
- Polish application UI and displayed atlas content, with Latin scientific names.
- English documentation and all technical project material.
- Working search, edibility filters, and comparison of any two different species.
- Edibility and identifying features visible near the top of details and comparison screens.
- At least two or three verified photographs per species.
- Complete first-launch offline behavior, including photographs.
- Documented sources, image rights, and content review.
- Passing relevant code checks, recorded native-device tests, and dependency audit follow-up.
- An Android installation package and English maintenance instructions.
