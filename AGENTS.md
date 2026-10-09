# Project conventions

- Use English for all technical project material: documentation, README files, plans, reports, file names, identifiers, types, JSON keys, code comments, commit messages, and developer-facing messages.
- Use Polish only for the application UI and atlas content shown inside the app. Scientific names remain Latin. Keep shared UI copy in `src/locales/pl.ts` and Polish atlas content in the local data files.
- Use React Native, Expo, TypeScript, and Expo Router; keep route files thin.
- Use `src/features` for feature screens, `src/components` for shared UI, and `src/theme` for styling tokens.
- Core atlas data and photos must be bundled locally to support first-launch offline use.
- Never present placeholder content as verified mushroom identification information.
- Run `npm run check` after changes. Use `npm run export:android` when changing navigation or app configuration.
- Device and emulator validation are pending until the user has an emulator or requests testing on a physical device.
- Do not install an emulator or launch one without a new user request.
