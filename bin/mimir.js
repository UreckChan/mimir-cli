#!/usr/bin/env node
const { spawn } = require("child_process");
const { existsSync, mkdirSync, createWriteStream } = require("fs");
const { join, homedir } = require("path");
const https = require("https");

const PKG_VERSION = "1.0.0";
const BIN_DIR = join(homedir(), ".mimir", "bin");
const REPO = "UreckChan/mimir-cli";

const PLATFORM_MAP = {
  "darwin-arm64": { binary: "mimir-macos-arm64", url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-macos-arm64` },
  "darwin-x64": { binary: "mimir-macos-arm64", url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-macos-arm64` },
  "linux-x64": { binary: "mimir-linux-x64", url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-linux-x64` },
  "win32-x64": { binary: "mimir-windows-x64.exe", url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-windows-x64.exe` },
};

const key = `${process.platform}-${process.arch}`;
const info = PLATFORM_MAP[key];

if (!info) {
  console.error(`[mimir] Unsupported platform: ${key}. Supported: macOS (arm64), Linux (x64), Windows (x64)`);
  process.exit(1);
}

const binaryPath = join(BIN_DIR, info.binary);

async function download() {
  mkdirSync(BIN_DIR, { recursive: true });
  console.error(`[mimir] Downloading binary for ${process.platform}...`);
  return new Promise((resolve, reject) => {
    const file = createWriteStream(binaryPath);
    https.get(info.url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        try { require("child_process").execSync(`chmod +x "${binaryPath}"`, { stdio: "ignore" }); } catch {}
        resolve();
      });
    }).on("error", reject);
  });
}

(async () => {
  if (!existsSync(binaryPath)) {
    try {
      await download();
    } catch (err) {
      console.error(`[mimir] Failed to download binary: ${err.message}`);
      console.error(`[mimir] Download manually from: ${info.url}`);
      process.exit(1);
    }
  }

  const child = spawn(binaryPath, process.argv.slice(2), { stdio: "inherit", env: { ...process.env } });
  child.on("exit", (code) => process.exit(code ?? 0));
  child.on("error", (err) => { console.error(`[mimir] Error: ${err.message}`); process.exit(1); });
})();
