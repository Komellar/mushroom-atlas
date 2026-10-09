# Standalone Android acceptance record

Status: partial native acceptance. A standalone internal test APK was built, verified, and freshly installed; see [the build record](android-release.md). First launch with airplane mode on and Wi-Fi off passed with Metro stopped. Full navigation, exhaustive content, layout/accessibility, and measurements remain pending.

Target: an already-running Pixel 10 Pro emulator (`sdk_gphone16k_x86_64`) reporting Android 17/API 37, 1280 × 2856 pixels, density 480, and font scale 1.0. The app was absent before installation. The user explicitly authorized ADB installation/testing and temporary settings changes. No emulator was installed or launched. Physical-device acceptance remains pending.

On 2026-10-09, ADB installation returned `Success`; airplane mode read `1` and Wi-Fi read `0` before the first `MainActivity` start. Android reported a cold activity launch with `TotalTime: 2187` ms and `WaitTime: 2191` ms. These are one platform activity-start sample, not time-to-usable-atlas measurements or a three-start median. The first screenshot and hierarchy showed the Polish atlas, safety guidance, 30 entries, bottom navigation, and a bundled photograph. [First-launch screenshot](acceptance/phase-8-first-launch.png).

The Borowik details page rendered offline with identification text and a local photograph. Android back returned to the atlas with its list position preserved. Native `luszczak` search produced one Łuszczak result. Subsequent other input changed screens and replaced the query during automated checks, invalidating the remaining sequence. Testing stopped without treating that sequence as a pass or an app defect. Original settings were restored and verified: airplane mode `0`, Wi-Fi `1`, font scale `1.0`, physical display 1280 × 2856/density 480 with no overrides. Uninterrupted emulator access is needed before resuming.

Record tester, date, device model, Android version, display size, system font scale, APK hash, signing certificate fingerprint, source revision, app version, and dataset version before testing. Do not record personal device identifiers.

## First launch without a populated cache

1. Use a fresh installation on the test device, or clear this app's test data with the device owner's agreement. Stop Metro.
2. Enable airplane mode and verify Wi-Fi is also off before opening the app for the first time.
3. Launch from the device's home screen. Record time to a usable atlas and any crash or blocking message. Confirm the Polish title, safety guidance, 30 entries, and category labels.
4. Open every species. Check all 66 gallery photographs, captions, enlargement/close, sources/credits text, morphology, habitat, months, and lookalikes. External source links need a network; the atlas and attribution text must still render offline.
5. Search Polish, Latin, and older scientific names, with and without Polish diacritics. Combine category filters, clear them, and verify empty results. Include `luszczak`, `Xerocomus badius`, and `kurka`.
6. Compare different species, replace either slot, reject identical selections, and swap columns. Check the 12 curated pairs in both orders and an undocumented pair with full generic rows. Scroll through all feature rows while checking aligned columns and persistent identities.
7. Complete atlas → details → similar species → comparison → atlas. Check query/filter/list-position restoration and Android system back behavior from details, selection, and enlarged photographs.
8. Force-close and restart offline; repeat opening the atlas, a photograph, and comparison. Record whether restart works without Metro or any previously downloaded asset.

## Layout and responsiveness

Check navigation and gesture safe areas, status bar, a small phone, portrait rotation behavior, scrolling, and the largest practical system font scale. Check touch targets, visible focus/selection, TalkBack labels, gallery controls, and disabled duplicate choices. Record any clipped text, obscured controls, inaccessible modal behavior, image delay, or scroll interruption.

Measure cold startup over at least three fresh process starts and record the individual times, observation method, and median. Measure installation/APK size and atlas scrolling under the test conditions. Browser transfer times and export size are not native performance measurements. Optimize only against observed problems and rerun affected checks after a change.

## Results

| Check                                             | Result  | Evidence / device / issue                                          |
| ------------------------------------------------- | ------- | ------------------------------------------------------------------ |
| Fresh first launch in airplane mode               | Passed  | Fresh standalone install; network settings verified; Metro stopped |
| Polish UI and 30 entries                          | Passed  | Native screenshot and hierarchy                                    |
| Every detail page and all 66 photographs          | Pending | —                                                                  |
| Search, combined filters, reset, restoration      | Partial | `luszczak` → one Łuszczak result; interrupted sequence needs rerun |
| Selection, duplicate rejection, swap, replacement | Pending | —                                                                  |
| Curated and generic comparisons offline           | Pending | —                                                                  |
| Full navigation flow and system back              | Partial | Borowik details → system back → atlas restored list position       |
| Safe areas, small screen, large fonts, TalkBack   | Pending | —                                                                  |
| Offline force-close and restart                   | Pending | —                                                                  |
| Cold startup and list responsiveness              | Pending | —                                                                  |
| APK and installation size                         | Partial | APK 130,473,159 bytes; installation measurement pending            |

Native sign-off remains pending until evidence is recorded. Content approval is a separate requirement in [independent content review](content-review.md).
