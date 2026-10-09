# Phase 8 development validation and release preparation

Validation date: 2026-10-09. Dataset: `0.7.0`.

Result: development checks and build preparation are implemented. APK compilation is in progress; native acceptance and independent content review remain pending. This report does not establish a completed release.

- Dataset validation and all 27 tests passed, including search normalization, scientific synonyms, combined filters, invalid/duplicate selections, reversible swapping, reference integrity, and both orders of every curated pair across 870 possible ordered different selections.
- TypeScript, ESLint, formatting, and the Android bundle export passed. Export verification found all 66 photographs and 66 thumbnails among the declared assets, with the bundle and local fonts present.
- The browser rendered all 30 detail pages and all 12 curated pairs in both orders. The expanded atlas → Łuszczak details → Galerina details → comparison → swap → atlas flow restored the query. Two- and three-photo boundary controls and enlargement/close passed. The dangerous lookalike comparison had no horizontal page overflow at 320 × 568, and application error logs were empty.
- Expo Doctor 1.20.4 passed 21/21 checks, and the SDK 57 dependencies passed Expo compatibility checking. Audit findings remain at 18 high and 11 moderate flagged packages; a compatible fix dry run proposed no changes. [The assessment](../dependency-assessment.md) records underlying advisories, installed paths, exposure inferences, and upgrade follow-up.
- A standalone internal APK profile is configured in `eas.json` and passed the official EAS schema validation. It does not include a development client. Cloud authentication and project ownership are unresolved; no cloud project or managed signing key has been created.
- Local Expo prebuild generated the ignored Android project. Required SDK 36, NDK, and CMake packages were installed using the host SDK's accepted licenses. Native compilation exposed Java 25 and incomplete Java 17 runtime issues; a full checksum-verified Temurin JDK 17 is prepared for the local build. No emulator was installed or launched.
- Android resource linking exposed a missing splash drawable. The splash plugin now explicitly references the bundled image, and regeneration produced the drawable at all five Android density levels. The corrected APK build remains pending.
- [Build instructions](../android-release.md), [native acceptance](../native-acceptance.md), APK archive verification, image maintenance, attribution, and pending specialist review are documented. APK content verification will establish archive inclusion only; runtime offline behavior needs a fresh standalone installation.

Remaining acceptance: produce and verify the APK, install on an authorized native test target, run the complete first-launch airplane-mode and navigation/accessibility checklist, record startup/list/installation measurements, and obtain independent review of descriptions, categories, photographs, and curated distinctions.
