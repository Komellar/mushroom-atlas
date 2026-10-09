# Standalone Android acceptance record

Status: pending. No device, APK, installation, runtime timing, or native result has been recorded. Browser checks and Android exports are development evidence only.

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

| Check                                             | Result  | Evidence / device / issue |
| ------------------------------------------------- | ------- | ------------------------- |
| Fresh first launch in airplane mode               | Pending | —                         |
| Polish UI and 30 entries                          | Pending | —                         |
| Every detail page and all 66 photographs          | Pending | —                         |
| Search, combined filters, reset, restoration      | Pending | —                         |
| Selection, duplicate rejection, swap, replacement | Pending | —                         |
| Curated and generic comparisons offline           | Pending | —                         |
| Full navigation flow and system back              | Pending | —                         |
| Safe areas, small screen, large fonts, TalkBack   | Pending | —                         |
| Offline force-close and restart                   | Pending | —                         |
| Cold startup and list responsiveness              | Pending | —                         |
| APK and installation size                         | Pending | —                         |

Native sign-off remains pending until evidence is recorded. Content approval is a separate requirement in [independent content review](content-review.md).
