# Mushroom Atlas

A mobile reference atlas of common mushroom species found in Poland.

Project location: `C:\projects\mushroom-atlas`.

## Language policy

- All technical project material is English: documentation, implementation plans, reports, file names, identifiers, types, JSON keys, code comments, commit messages, and developer-facing messages.
- The application UI and atlas content displayed inside the app are Polish. Scientific names remain Latin.
- Shared UI strings live in `src/locales/pl.ts`. Future species descriptions will use English field names and Polish content values in local data files.
- The Polish display name in `app.json` is part of the application UI.

## Implementation status

Phases 1–7 development is implemented: 30 sourced species, 66 locally bundled photographs with smaller thumbnails, local search/filters, complete species details, and two-species comparison. Twelve curated pairs include source references and relevant qualifications. Search accepts Polish synonyms and recorded scientific synonyms. Dataset version: `0.7.0`.

Specialist content review, native validation, and the installable release remain pending and are recorded in the app and acceptance reports. See [the implementation plan](docs/implementation-plan.md), [Phase 7 acceptance](docs/acceptance/phase-7.md), and [the specialist review inventory](docs/content-review.md). Preparing an inventory does not establish that a reviewer has been arranged.

Phase 8 release preparation includes a standalone APK build profile, documented local/cloud build paths, and [native acceptance steps](docs/native-acceptance.md). See [Android release preparation](docs/android-release.md) and [dependency assessment](docs/dependency-assessment.md). APK compilation and native testing are recorded separately from passing exports.

Android emulator and physical-device validation are deferred at the user's request. An Android JavaScript bundle export is not an APK build and does not replace a device test.

See [the implementation plan](docs/implementation-plan.md) for phases, steps, acceptance criteria, and pending device checks.

## Requirements

- Node.js compatible with Expo SDK 57 and npm. The project was prepared using Node.js `22.16.0` and npm `11.4.2`.
- An Android emulator is not needed for type checking, linting, formatting checks, or JavaScript bundle exports.

## Getting started

```powershell
Set-Location C:\projects\mushroom-atlas
npm ci
npm start
```

Optional browser preview:

```powershell
npm run web
```

Once the Android emulator is ready:

```powershell
npm run android
```

## Code quality

```powershell
npm run check
```

This command validates dataset fields, references, photo files and hashes, runs validator tests, and runs TypeScript, ESLint, and Prettier. Individual commands:

```powershell
npm run typecheck
npm run lint
npm run format:check
npm run validate:data
npm test
```

Format project files:

```powershell
npm run format
```

Export platform bundles without an emulator:

```powershell
npm run export:android
npm run export:web
npm run verify:android
```

The output directories are `dist/android` and `dist/web`. These generated files are ignored by Git.

`verify:android` checks the bundle and declared export assets, including every source photograph and thumbnail by SHA-256. It verifies export contents, not standalone device behavior. See [data maintenance](docs/data-maintenance.md) for the thumbnail and attribution workflow.

## Project structure

```text
src/
  app/                  # Expo Router routes
    (tabs)/             # Atlas and comparison tabs
    mushrooms/[id].tsx  # Species details route
  components/           # Shared UI
  features/
    atlas/
    comparison/
    mushroom-details/
  data/                 # Local atlas JSON, lookups, and static asset imports
  locales/              # Polish UI strings
  theme/                # Shared design tokens
  types/                # Shared atlas models
  utils/                # Shared utilities
assets/mushrooms/       # Bundled species photographs
scripts/                # Data validation and tests
docs/                   # English project documentation
```

## Navigation

- `/` — atlas.
- `/compare` — comparison screen.
- `/mushrooms/<id>` — full details for a bundled species.
- Unknown species identifiers (including the old `preview` placeholder) show a Polish recovery message.
- Unknown routes show a Polish recovery screen with a link to the atlas.

The current app icon assets come from the Expo starter template. Final branding will be prepared in a later phase.

## Previous validation results

Phase 1 passed all 21 Expo Doctor checks. Dependency compatibility was checked using `npx expo install --check`. TypeScript, ESLint, Prettier, and Android/web bundle exports passed. Navigation and recovery screens were checked in a browser viewport of 390 × 844.

These results describe phase 1 implementation checks, not a successful launch on Android.

The acceptance rerun on 2026-10-09 passed code checks, Android bundle export, and Polish UI/navigation checks in a 390 × 844 browser viewport. See [the Phase 1 acceptance report](docs/acceptance/phase-1.md) for results and remaining native checks.

Phase 2 passed dataset checks, 13 validator tests, code checks, and an Android export containing all 15 photograph hashes. See [its acceptance report](docs/acceptance/phase-2.md), [data maintenance](docs/data-maintenance.md), and [photo credits](docs/photo-credits.md).

## Dependency audit

The phase 1 npm audit, after running `npm audit fix`, still reported 29 vulnerabilities in the Expo and React Native dependency tree: 18 high and 11 moderate. The underlying reports include `braces`, `node-forge`, `uuid`, and `decode-uri-component`, plus packages depending on them. The count represents flagged packages, not 29 independent defects.

`npm audit fix --force` was not applied because suggested changes include incompatible framework versions, including a downgrade to Expo SDK 44. Recheck compatible fixes before a production release. Passing code checks and Expo Doctor does not imply a clean security audit.

Phase 8 rechecked these findings on 2026-10-09. A compatible fix dry run proposed zero changes; the installed SDK 57 dependency set passed compatibility checks and all 21 Expo Doctor checks. The runtime URI-decoding finding and toolchain findings remain open, with exposure and remediation paths in [dependency assessment](docs/dependency-assessment.md).

## Device validation pending emulator setup

1. Launch the app on Android.
2. Switch between the atlas and comparison tabs.
3. Open species details and return using the system back button.
4. Navigate from details to comparison and back to the atlas.
5. Check safe areas, small screens, and larger system font sizes.

First-launch offline validation requires a later standalone application build with the species dataset and photographs included. Development mode relies on Metro.
