# Android build and acceptance procedure

Status on 2026-10-09: a standalone internal test APK was built and its archive and signature verified. Fresh installation and first launch in airplane mode passed on the existing Pixel 10 Pro emulator. Full native acceptance and independent content review remain pending. Android is the first release target; iOS build and device acceptance are outside this validation run.

## Build prerequisites

The current Windows environment has Node.js 22.16.0 and npm 11.4.2. Java, adb, and EAS CLI were not found on PATH; `JAVA_HOME` was unset. A direct host check found the SDK at `C:\Users\adria\AppData\Local\Android\Sdk`. The sandbox's environment path differs from the host path, so an SDK check there is insufficient. The local build installed SDK 36 revision 2, NDK 27.1.12297006, Build Tools 35.0.0, and CMake 3.22.1 using already accepted SDK licenses; Build Tools 36.0.0 was present. No emulator was installed or launched. EAS CLI reported `Not logged in`; cloud authentication and project ownership remain unresolved.

Android Studio's Java 25.0.3 failed in native CMake tasks, and IntelliJ's Java 17 runtime lacked `jlink`. A complete Temurin 17.0.20.1+1 JDK was downloaded from the [official release](https://github.com/adoptium/temurin17-binaries/releases/tag/jdk-17.0.20.1%2B1) into ignored `.expo/toolchains/temurin-17/`. Its ZIP SHA-256 was verified as `e53a79c3c3d86865bd7e787903884331068e71321714ffd44f145785affc7cb0`. Use the full JDK, including `java`, `javac`, and `jlink`; no system-wide Java setting was changed.

`eas.json` provides one `preview` profile: internal distribution, release APK, no development client, Node.js 22.16.0, and the named SDK 57 Android image. EAS CLI is pinned to 24.12.1. The lockfile pins JavaScript dependencies, and the post-install hook runs project checks before building. Record actual server tool versions from the build log: named images can receive minor updates. See [Expo APK configuration](https://docs.expo.dev/build-reference/apk/), [build profiles](https://docs.expo.dev/build/eas-json/), and [server images](https://docs.expo.dev/build-reference/infrastructure/).

An Expo account, an EAS project owned by the intended account, and Android signing credentials are needed for the cloud path. Account login, build quota, project ownership, and key management must be resolved before starting the build. No cloud project ID or signing key is invented in this repository. Keep credentials and private keys out of Git; their usual files are ignored.

## Build from a reviewed revision

1. Check out the intended commit and run `npm ci`, `npm run check`, `npm run export:android`, and `npm run verify:android`. Record the commit and dataset version. Review the dependency findings in [dependency assessment](dependency-assessment.md).
2. Authenticate locally using `npx --yes eas-cli@24.12.1 login`; keep passwords and tokens out of chat and source files.
3. Run `npx --yes eas-cli@24.12.1 init` to link the intended existing EAS project or create it under the chosen account. Review and commit the resulting project ID in app configuration. Use existing signing credentials or explicitly choose managed credentials in the EAS prompts; retain access to the signing key for future upgrades.
4. Run `npx --yes eas-cli@24.12.1 build --platform android --profile preview`. This sends the project to Expo's build service and uses that account's build quota. Do not select automatic emulator installation; emulator use requires a new user request.
5. Download the APK from the completed build's artifact link. Store it under ignored `dist/releases/`, record its build ID, source commit, app version, dataset version, byte size, and SHA-256. No store submission is part of this procedure.
6. Install on the requested test device and complete [native acceptance](native-acceptance.md). Only record a pass when it was observed on the standalone app.

The preview profile produces an installable release APK with bundled JavaScript. `expo start`, Expo Go, and the exported Hermes bundle do not establish independent first-launch behavior. Existing external references open the browser when online; their availability is separate from the bundled atlas.

## Local build alternative

A configured Android SDK/NDK and JDK are needed. The installed React Native version requests Android SDK 36, Build Tools 36.0.0, and NDK 27.1.12297006. Expo supports generating native projects with `npx expo prebuild --platform android --no-install` and building with native tools. The generated Android directory is ignored; preserve any signing configuration securely and document changes needed to reproduce the build. Prebuild can rewrite package scripts; review and restore those changes if they are not intended.

For a standalone internal test APK, the task is `:app:assembleRelease`. The generated template currently signs release builds with its publicly known debug key. This can create a test installation package, but is not suitable for production signing or distribution. A production candidate requires an independently managed private signing key. Follow [Expo's local release guide](https://docs.expo.dev/guides/local-app-production/).

The local build uses the full JDK 17 and host SDK. Gradle installs required missing SDK/NDK packages when their license has already been accepted in that SDK; it does not create or launch an emulator. Quote dotted Gradle properties in PowerShell so they remain a single argument:

```powershell
$env:JAVA_HOME = 'C:/projects/mushroom-atlas/.expo/toolchains/temurin-17/jdk-17.0.20.1+1'
$env:ANDROID_HOME = 'C:/Users/adria/AppData/Local/Android/Sdk'
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:GRADLE_USER_HOME = 'C:/projects/mushroom-atlas/.expo/g'
$env:EXPO_NO_TELEMETRY = '1'
$env:CI = '1'
$env:NODE_ENV = 'production'
$env:PATH = "$env:JAVA_HOME/bin;$env:PATH"
Set-Location C:/projects/mushroom-atlas/android
.\gradlew.bat :app:assembleRelease --no-daemon --console=plain '-Pandroid.builder.sdkDownload=true'
```

The generated wrapper is Gradle 9.3.1. The short cache path avoids Ninja's 260-character Windows filename limit: the previous `.expo/gradle-home` path produced a 266-character React Native header path. The build also downloads Gradle and Maven dependencies into the build cache. Native installation and launch are separate actions. Verify the resulting archive before installation:

```powershell
Set-Location C:/projects/mushroom-atlas
./scripts/verify-apk.ps1 -ApkPath ./android/app/build/outputs/apk/release/app-release.apk
```

This checks that the standalone JavaScript bundle, fonts, and all source/thumbnail hashes are present in the APK. Record the APK's size/hash and certificate fingerprint. Missing packages or Java/compiler incompatibilities must be resolved and recorded before claiming a successful build.

Do not install or launch an emulator without a new user request. EAS `--local` officially supports macOS and Linux; Windows/WSL support is not assured. See [local EAS limitations](https://docs.expo.dev/build-reference/local-builds/). Installing a local Android toolchain or accepting its licenses is a separate environment setup step.

## Release record

| Field                              | Current record                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| Source revision                    | `8e20e938de83f19994248e197b3244b6ee4ca7db`                                      |
| Dataset                            | 0.7.0                                                                           |
| App version / Android version code | 0.1.0 / 1; confirmed by `aapt`                                                  |
| Build service / build ID           | Local Gradle `:app:assembleRelease`; 9m 34s                                     |
| Build image / tool versions        | Windows; Temurin 17.0.20.1+1, Gradle 9.3.1, SDK 36, NDK 27.1.12297006           |
| APK path / bytes / SHA-256         | `dist/releases/mushroom-atlas-0.1.0-8e20e93.apk`; 130,473,159 bytes; hash below |
| Signing identity                   | Generated Android Debug certificate; v2 signature verified; fingerprint below   |
| Test device and Android version    | Existing Pixel 10 Pro emulator; Android 17/API 37                               |
| Native first-launch offline result | Passed fresh install, airplane mode on and Wi-Fi off; Metro stopped             |
| Independent content review         | Pending                                                                         |

APK SHA-256: `e97fa02f5ca9af19cfeb1d244a3431f85660e67916221a3fdeb587b4ae8d55f2`.

Signing certificate SHA-256: `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`. This publicly known generated debug key is for internal testing, not production distribution.

Archive verification matched all 66 source photographs and 66 thumbnails by SHA-256, with nonempty standalone JavaScript and bundled fonts. Manifest inspection confirmed package `pl.mushroomatlas.app`, Polish label `Atlas grzybów`, launcher `MainActivity`, minimum SDK 24, target SDK 36, and `armeabi-v7a`, `arm64-v8a`, `x86`, `x86_64` libraries. The manifest has no `debuggable` attribute. Embedded version-control metadata reported `NO_SUPPORTED_VCS_FOUND`; source provenance is recorded from the checked-out pushed Git revision, not claimed from that metadata. Only documentation changed while compiling.

The APK is a local ignored artifact. Full native checks and measurements are recorded separately in [native acceptance](native-acceptance.md); independent content approval and production signing remain pending.
