#!/usr/bin/env node
const { spawn, execSync } = require("child_process");
const { existsSync } = require("fs");
const { join } = require("path");

const PLATFORM_MAP = {
  "darwin-arm64": "mimir-macos-arm64",
  "darwin-x64": "mimir-macos-arm64",    // Rosetta 2 runs arm64
  "linux-x64": "mimir-linux-x64",
  "win32-x64": "mimir-windows-x64.exe",
};

const key = `${process.platform}-${process.arch}`;
const binaryName = PLATFORM_MAP[key];

if (!binaryName) {
  console.error(`[mimir] Plataforma no soportada: ${key}`);
  console.error("[mimir] Soporta: macOS (arm64), Linux (x64), Windows (x64)");
  process.exit(1);
}

const binaryPath = join(__dirname, binaryName);

if (!existsSync(binaryPath)) {
  console.error(`[mimir] Binario no encontrado: ${binaryPath}`);
  console.error("[mimir] Reinstala el paquete: npm install -g mimir-cli");
  process.exit(1);
}

// Ensure executable
try { execSync(`chmod +x "${binaryPath}"`, { stdio: "ignore" }); } catch {}

const child = spawn(binaryPath, process.argv.slice(2), {
  stdio: "inherit",
  env: { ...process.env },
});

child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (err) => {
  console.error(`[mimir] Error al ejecutar: ${err.message}`);
  process.exit(1);
});
