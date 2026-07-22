#!/usr/bin/env node
const { spawn } = require("node:child_process");
const { existsSync, mkdirSync, createWriteStream } = require("node:fs");
const { join } = require("node:path");
const { homedir } = require("node:os");
const https = require("node:https");

const MAX_REDIRECTS = 5;

const PKG_VERSION = require("../package.json").version;
const BIN_DIR = join(homedir(), ".mimir", "bin");
const REPO = "UreckChan/mimir-cli";

const PLATFORM_MAP = {
  "darwin-arm64": {
    binary: "mimir-macos-arm64",
    url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-macos-arm64`,
  },
  "darwin-x64": {
    binary: "mimir-macos-arm64",
    url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-macos-arm64`,
  },
  "linux-x64": {
    binary: "mimir-linux-x64",
    url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-linux-x64`,
  },
  "win32-x64": {
    binary: "mimir-windows-x64.exe",
    url: `https://github.com/${REPO}/releases/download/v${PKG_VERSION}/mimir-windows-x64.exe`,
  },
};

const key = `${process.platform}-${process.arch}`;
const info = PLATFORM_MAP[key];

if (!info) {
  console.error(`[mimir] Unsupported platform: ${key}. Supported: macOS (arm64), Linux (x64), Windows (x64)`);
  process.exit(1);
}

const binaryPath = join(BIN_DIR, info.binary);

function fetchFollowingRedirects(url, redirectsLeft) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode, headers } = res;
        if (statusCode >= 300 && statusCode < 400 && headers.location) {
          res.resume(); // descartar el body de la respuesta de redirect
          if (redirectsLeft <= 0) {
            reject(new Error("Demasiados redirects al descargar el binario"));
            return;
          }
          resolve(fetchFollowingRedirects(headers.location, redirectsLeft - 1));
          return;
        }
        if (statusCode !== 200) {
          reject(new Error(`Download failed: HTTP ${statusCode}`));
          return;
        }
        resolve(res);
      })
      .on("error", reject);
  });
}

async function download() {
  mkdirSync(BIN_DIR, { recursive: true });
  console.error(`[mimir] Downloading binary for ${process.platform}...`);
  const res = await fetchFollowingRedirects(info.url, MAX_REDIRECTS);
  const file = createWriteStream(binaryPath);
  await new Promise((resolve, reject) => {
    res.pipe(file);
    file.on("finish", () => {
      file.close();
      try {
        require("node:child_process").execSync(`chmod +x "${binaryPath}"`, { stdio: "ignore" });
      } catch {}
      resolve();
    });
    file.on("error", reject);
    res.on("error", reject);
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
  child.on("error", (err) => {
    console.error(`[mimir] Error: ${err.message}`);
    process.exit(1);
  });
})();
