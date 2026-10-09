# Phase 1 acceptance report

Validation date: 2026-10-09.

Acceptance criterion: the app launches with Polish UI and working navigation.

Result: development checks and browser acceptance passed. A later native rerun on the complete app passed fresh offline launch with Polish UI; full native navigation acceptance remains pending.

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

## Pending native acceptance

The original Android export was a JavaScript/Hermes bundle. A later standalone APK from revision `8e20e93` passed fresh first offline launch on the existing Pixel 10 Pro emulator. Polish UI and 30 entries rendered; details/system back/list restoration were observed. Other input interrupted remaining navigation checks, which require a rerun. See [the partial native record](../native-acceptance.md). No emulator was installed or launched, and no physical device was tested.

- Fresh offline launch and Polish UI passed on the current standalone app.
- Switch tabs and open details on Android.
- Verify Android system back behavior and details → comparison → atlas navigation.
- Check native safe areas, small screens, and larger system font sizes.
- Perform a physical-device check when available.

Phase 1 retains its status: **Development implemented; native validation pending**.
