# Dataset 0.8.0 acceptance

Updated 2026-10-10. The atlas contains 34 species, 74 source photographs, 74 thumbnails, and 12 curated pairs.

Added Coprinus comatus, Craterellus cornucopioides, Russula virescens, and Xerocomellus chrysenteron. Each has a complete Polish card, source references, approximate season notes, lookalikes, and two bundled photographs. The existing Russula virescens lookalike entry now links to its card. No additional curated pair differences were inferred.

## Validation

- Data validation and all 27 tests passed, together with TypeScript, ESLint, and formatting checks.
- Android and web exports passed. Android export verification confirmed SHA-256 matches for all 74 source photographs and 74 thumbnails, with 176 declared assets present.
- All eight new photographs were visually screened together against the source descriptions. Source identification remains preliminary and does not constitute independent specialist review.
- Browser preview showed 34 species. Searching for czernidłak returned its new card. The card rendered Polish content and both bundled photos; switching to the second photo displayed 2 / 2 and disabled the next control.
- A phone-sized browser preview is saved in [dataset-0-8-species.jpg](dataset-0-8-species.jpg).

Independent content review remains pending. Standalone APK validation of this dataset update has not been performed; previous APK/native results cover the earlier dataset. No emulator was installed or launched.

## Expo Go recovery on the existing emulator

The user reported a failure after the dataset addition. The visible Expo Go screen showed a Metro compile error resolving `assets/mushrooms/thumbnails/coprinus-comatus-1.jpg`, although the file was present and both exports passed. Restarting the running Metro server with `npx expo start --clear` resolved the missing-asset error. This is evidence of stale development-server state; no app runtime exception was captured for this failure.

The initial reload through the previous LAN address failed to download the update. ADB reverse forwarding for port 8081 and opening `exp://127.0.0.1:8081` restored the development session. On the already-running emulator, the atlas showed 34 species, the normalized query `czernidlak` returned one result, and the new card rendered both photographs. At the second photograph the counter showed 2 / 2 and Next was disabled. The new Expo Go process had no AndroidRuntime or ReactNativeJS error output in the focused log check. This is a focused recovery check, not complete standalone or offline acceptance.

[Recovery screenshot](metro-crash-recovery.png).
