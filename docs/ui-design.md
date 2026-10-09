# Shared UI design

Phase 3 uses the forest-green identity from Phase 1, a warm background, white content cards, and the platform system font. No font download is needed. Typography uses 32/40 title, 21/29 heading, and 16/25 body sizes. Text scales with system settings; copy is not truncated. Interactive targets are at least 48 logical pixels tall.

## Screen layouts

- Atlas: Polish title, concise safety/review notice, search and filters (Phase 4), results count, and vertically stacked species cards. Cards show photo, category icon/text/color, Polish name, Latin name, and compact attribution.
- Details: identity, category and note, key features, local gallery, identification tips, morphology, habitat, months, similar species, comparison actions, and references. Phase 3 wires the identity/key-feature/gallery foundation; Phase 5 completes the information sections.
- Selection: full-screen accessible modal, search input, one scrollable list, disabled duplicate choice, and cancel. Phase 6 connects selections to comparison routing and state.
- Comparison: two persistent species identities, replacement/swap controls, curated differences, and full-width feature labels over two equal columns. Each row has a shared height and both columns share one vertical scroll container. Phase 6 wires this layout.

## Components and accessibility

`SpeciesCard`, `EdibilityBadge`, `PhotoGallery`, `FeatureList`, `OccurrenceMonths`, `SpeciesSelector`, `ComparisonRow`, `SafetyNotice`, `Button`, and `ExternalReference` live in `src/components`. Route files remain thin; feature screens compose these components.

Edibility uses a check-circle, minus-circle, or warning icon plus Polish text and green, amber, or red. Meaning does not rely on color. Occurrence months include a dot and spoken full-month/season labels. Rows, badges, and text wrap rather than relying on fixed text heights. Selection and gallery modals close via visible buttons and native `onRequestClose`; source/license links are opened only when the user activates them.

Gallery previews and enlarged photos use `contain` so anatomical details remain visible. Only atlas card thumbnails use `cover`. Galleries show captions, authors, source-file links, licenses, and resizing notices. Browser layouts are checked at mobile widths; native safe areas and actual large-system-font behavior remain pending device availability.
