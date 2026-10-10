# Phase 1 acceptance report

Validation date: 2026-10-09.

Acceptance criterion: the app launches with Polish UI and working navigation.

Result: **accepted on the existing Android emulator**. Development and browser checks passed. A later native rerun of the complete app passed fresh offline launch with Polish UI, navigation, Android back, and recovery screens.

## Completed checks

| Check                                          | Result                                                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| `npm run check` (TypeScript, ESLint, Prettier) | Passed                                                                 |
| `npm run export:android`                       | Passed; Hermes bundle and 28 assets exported to `dist/android`         |
| Browser launch at `/`                          | Passed; Polish atlas UI displayed                                      |
| Atlas and comparison tabs                      | Passed in both directions                                              |
| Atlas action links to details and comparison   | Passed                                                                 |
| Details header back link                       | Passed; returned to the atlas                                          |
| Details → comparison → atlas                   | Passed                                                                 |
| Unknown species identifier                     | Passed; Polish missing-species message and working atlas recovery link |
| Unknown route                                  | Passed; Polish missing-page message and working atlas recovery link    |
| Browser console                                | No captured warnings or errors during the checked flows                |

Original Phase 1 browser validation used the local Expo web development preview in the Codex in-app browser at a 390 × 844 viewport. At that stage the atlas, comparison, and details screens visibly labeled their content as work in progress. The details preview was a navigation placeholder, not a verified species entry. Later phases replaced it with the local dataset and full details.

![Polish atlas screen at 390 × 844](phase-1-atlas.jpg)

## Environment notes

Expo telemetry was disabled for the acceptance commands with `EXPO_NO_TELEMETRY=1`. The initial sandboxed export encountered permissions errors in the Expo user-state and Hermes temporary directories. Export succeeded after directing temporary files into `.expo/acceptance-temp`, and also passed outside the sandbox with the normal temporary directory. The sandboxed web preview was unreachable from the browser; the successful browser checks used a localhost preview outside the sandbox. These workarounds required no application code changes.

## Native acceptance

The standalone APK from revision `8e20e93` passed fresh first offline launch on the existing Pixel 10 Pro emulator (Android 17/API 37). Polish UI and all 30 entries rendered with Metro stopped, airplane mode on, and Wi-Fi off. ADB testing was explicitly authorized. No emulator was installed or launched, and no physical device was tested. See [the native record](../native-acceptance.md) for build identity, device conditions, and broader release checks.

- Atlas and comparison tabs worked in both directions.
- Species details opened from the filtered atlas; Android back restored the card position within 16 pixels on the recorded repeat check.
- Atlas → Łuszczak details → Galerina details → comparison → atlas retained the `luszczak` query, edible filter, one result, and card position.
- Details preselection, searchable second selection, column swapping, duplicate rejection, and replacement passed.
- Android back closed the selection modal and enlarged photographs.
- Invalid species and unknown routes displayed Polish recovery screens with working atlas links.

The initial native sequence was invalidated by test actions targeting controls obscured by the keyboard. The helper was corrected and the navigation sequence rerun successfully. This acceptance concerns application behavior; it does not establish expert approval of mushroom content. Physical-device validation remains a follow-up.

Follow-up on 2026-10-10: the rebuilt APK from `cb093b1` passed fresh offline Polish launch and all seven navigation regression cases, including exact atlas card-position restoration in the recorded repeat. Small-screen and 200% font checks verified the comparison/tab fix. Phase 1 acceptance remains passed on the existing emulator; see [native acceptance](../native-acceptance.md).
