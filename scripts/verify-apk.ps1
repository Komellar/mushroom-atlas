param(
    [Parameter(Mandatory = $true)]
    [string]$ApkPath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$taskApk = Get-Item -LiteralPath $ApkPath
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskPhotos = Get-Content -Raw -LiteralPath (Join-Path $taskRoot 'src/data/photos.json') -Encoding UTF8 | ConvertFrom-Json
$taskHashes = [System.Collections.Generic.HashSet[string]]::new()
$taskArchive = [System.IO.Compression.ZipFile]::OpenRead($taskApk.FullName)
$taskHasBundle = $false
$taskHasFonts = $false
try {
    foreach ($taskEntry in $taskArchive.Entries) {
        if ($taskEntry.FullName -eq 'assets/index.android.bundle' -and $taskEntry.Length -gt 0) {
            $taskHasBundle = $true
        }
        if ($taskEntry.FullName.EndsWith('.ttf')) { $taskHasFonts = $true }
        if (!$taskEntry.FullName.EndsWith('.jpg')) { continue }
        $taskStream = $taskEntry.Open()
        $taskHasher = [System.Security.Cryptography.SHA256]::Create()
        try {
            $taskHash = [BitConverter]::ToString($taskHasher.ComputeHash($taskStream)).Replace('-', '').ToLowerInvariant()
            [void]$taskHashes.Add($taskHash)
        } finally {
            $taskHasher.Dispose()
            $taskStream.Dispose()
        }
    }
    foreach ($taskPhoto in $taskPhotos) {
        if (!$taskHashes.Contains($taskPhoto.sha256)) { throw "Photograph missing from APK: $($taskPhoto.id)" }
        if (!$taskHashes.Contains($taskPhoto.thumbnailSha256)) { throw "Thumbnail missing from APK: $($taskPhoto.id)" }
    }
    if (!$taskHasBundle) { throw 'Standalone Android JavaScript bundle is missing.' }
    if (!$taskHasFonts) { throw 'Bundled icon fonts are missing.' }
} finally {
    $taskArchive.Dispose()
}
$taskApkHash = (Get-FileHash -LiteralPath $taskApk.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
Write-Output "Verified APK contents: $($taskPhotos.Count) photographs, $($taskPhotos.Count) thumbnails, JavaScript bundle and fonts."
Write-Output "APK bytes: $($taskApk.Length). SHA-256: $taskApkHash"
Write-Output 'This checks archive contents; native first-launch offline behavior remains a device check.'
