# Standalone Android acceptance record

Validation dates: 2026-10-09–10. Phase 1 Polish launch and navigation acceptance passed. Native functional checks and affected large-font regression checks passed; final release sign-off remains incomplete because the checks listed below and independent content review remain pending.

Target: the already-running Pixel 10 Pro emulator (`sdk_gphone16k_x86_64`), Android 17/API 37, physical display 1280 × 2856 pixels, density 480, font scale 1.0. The user explicitly authorized ADB installation/testing and temporary settings changes. No emulator was installed or launched. The app was absent before the initial installation. Dataset: `0.7.0`; app: `0.1.0`. No personal device identifiers are recorded.

## Artifact and scope

The subsequent gallery-loading commit `365992d` is already on `main`. It is not included in the APK tested here, so its native validation remains pending. The results below apply to the stated APK revisions.

The original APK from `8e20e93` received exhaustive checks of all 30 detail pages, all 66 gallery photographs, and all 12 curated pairs in both column orders, plus a generic pair. The current APK from `cb093b1d4c08df231b32ed5dda307e4ac493d292` contains the comparison/tab large-font fix and received affected reruns. The exhaustive gallery and pair matrix was not repeated in full on the rebuild. Archive verification confirmed all unchanged photograph and thumbnail hashes, JavaScript, and fonts in the rebuilt APK.

Current local artifact: `dist/releases/mushroom-atlas-0.1.0-cb093b1.apk`, 130,473,671 bytes. SHA-256: `d81c41468965ee0f5b6b85d11c0830ae2fea06a4122bb990ae990fe0a91e49a2`. Its verified v2 signature uses the generated Android Debug certificate, SHA-256 `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`. This is an internal test package. See [build provenance and procedure](android-release.md).

## Functional results

Fresh installation of the original APK launched with airplane mode on, Wi-Fi off, and Metro stopped. Polish guidance, 30 entries, navigation, and a bundled photograph rendered. Android activity TotalTime was 2187 ms and WaitTime 2191 ms. [First-launch screenshot](acceptance/phase-8-first-launch.png).

The updated APK was installed over this test app and only its test data was cleared. Fresh offline launch again rendered the Polish atlas and 30 entries; TotalTime was 2700 ms and WaitTime 2713 ms. These single activity-start samples do not establish a time-to-usable median.

Search passed `luszczak` normalization, scientific synonym `Xerocomus badius`, `kurka` with the inedible filter, empty combined-filter feedback, unknown queries, and reset to all 30 species. All 30 species displayed identity, edibility notes, and 12 required detail headings. All 66 enlarged photographs had nonblank pixels and changed between gallery selections; counters, boundary controls, close, and Android back passed. These checks establish rendering and navigation, not expert mushroom identification.

All 12 curated pairs passed both column orders, plus one undocumented pair with all nine generic headings. Ordered identities, photo labels, aligned curated values, and qualification notes were observed offline. The rebuilt APK passed three focused comparison cases, including both orders of Kuehneromyces/Galerina and a generic pair.

The rebuilt APK passed seven navigation cases: full atlas → details → similar species → comparison → atlas flow, details preselection, searchable second selection, swapping, disabled duplicate rejection, cancellation/replacement, and both Polish missing-route recovery paths. Query, edible filter, one result, and list position were retained; the recorded atlas card bounds matched exactly before and after the repeat. Offline force-close/restart reopened the atlas, a photograph, and comparison without Metro or network access. No runtime errors were captured in the final active-process log check; this does not imply there were no errors across every interrupted run.

## Layout and interrupted runs

At 320 × 568 dp and font scale 2.0, the original pinned comparison identity block obscured feature rows and tab labels were clipped. The fix pins only Polish names on short displays with enlarged fonts; scientific names, column labels, and edibility remain above the photographs. Tab height accommodates enlarged labels and the bottom inset.

[Before the fix](acceptance/phase-8-large-font-before.png) · [After the fix](acceptance/phase-8-large-font-after.png).

The rebuilt APK passed 320 × 568 dp checks at font scales 1.0 and 2.0: search, keyboard dismissal, detail scrolling, and two-photo gallery next/close controls. Three representative long-name comparisons at scale 2.0 passed: Kuehneromyces/Galerina, Amanita rubescens/pantherina, and Macrolepiota/Chlorophyllum. Sampled headings and the final feature row were observed, with scrolling and representative cells inspected. The shortened pinned block left 200 dp of uncovered content in the recorded cases. This does not establish visual inspection of every comparison paragraph at every font scale. Accessibility labels and selected/disabled states were inspected; interactive TalkBack gestures were not tested. Rotation was not tested.

The first search sequence was invalidated by helper taps targeting controls obscured by the keyboard. The earlier attribution to other input was incorrect; the corrected helper dismisses the keyboard before app-control actions. A large-font run later timed out and the emulator recorded an app ANR. Windows entered sleep at 22:10:19 UTC; on resume, its clock jumped from 22:10:25 UTC to 05:45:20 UTC. The Android ANR timing overlapped this suspension. That run's timing was invalidated; unfinished cases and subsequent navigation/comparison checks passed after resume. This correlation does not establish a general absence of app ANRs.

At completion, original settings were verified restored: airplane mode 0, Wi-Fi 1, font scale 1.0, physical size 1280 × 2856 with no override, and density 480. Rotation and accessibility settings were not changed.

## Measurements

Three fresh process starts used Android force-stop followed by activity start with timing, with existing app data and OS caches retained, airplane mode on, and Wi-Fi off. Activity TotalTime values were 870, 768, and 747 ms; median 768 ms. Host times until hierarchy confirmation of the atlas were 3604, 3498, and 3478 ms; median 3498 ms. Hierarchy collection adds several seconds of automation overhead, so those values are not intrinsic time-to-usable measurements.

Eight controlled 500 ms atlas swipes at the original display/font settings recorded 290 frames. Android gfxinfo reported 90 modern janky frames (31.03%) and five legacy janky frames (1.72%). Frame-time percentiles at 50/90/95/99 were 17/18/19/20 ms. The high modern jank count remains a profiling follow-up; smooth-scrolling acceptance is not established. These emulator observations require physical-device confirmation. APK size is recorded above; total installed storage was not measured.

## Results and remaining acceptance

| Check                                     | Result   | Scope                                                                                       |
| ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------- |
| Fresh offline Polish launch               | Passed   | Original fresh install and rebuilt APK with cleared test data                               |
| All details and 66 photographs            | Passed   | Exhaustive original APK; unchanged asset verification and focused gallery reruns on rebuild |
| Search, filters, reset, restoration       | Passed   | Native synonyms, empty feedback, and retained atlas state                                   |
| Selection, swaps, duplicates, replacement | Passed   | Rebuilt APK navigation regression                                                           |
| Curated and generic comparisons           | Passed   | Exhaustive original matrix; three affected cases on rebuild                                 |
| Navigation and Android back               | Passed   | Seven rebuilt APK cases and gallery checks                                                  |
| Small screen and large fonts              | Passed   | Recorded 320 × 568 dp layouts and three representative long-name pairs                      |
| Offline restart                           | Passed   | Atlas, enlarged photograph, comparison                                                      |
| Startup and scrolling                     | Measured | Timing limits above; high emulator jank requires follow-up                                  |
| APK and installed size                    | Partial  | APK 130,473,671 bytes; installed storage pending                                            |
| Interactive TalkBack and rotation         | Pending  | Not performed                                                                               |
| Physical-device/performance acceptance    | Pending  | Emulator evidence only                                                                      |
| Independent content approval              | Pending  | Reviewer has not been arranged or completed                                                 |

The remaining work is interactive TalkBack and rotation testing, total installed-storage measurement, physical-device performance validation, and [independent content review](content-review.md). For a future fresh-install rerun, stop Metro, verify airplane mode/Wi-Fi before first launch, record artifact/device settings and timing methods, repeat details/gallery/search/comparison/navigation checks, and restore temporary settings afterward. Content approval remains separate from successful rendering.
