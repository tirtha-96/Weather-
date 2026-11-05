#!/usr/bin/env node
/**
 * `npm run dev` from the repository root.
 *
 * - Installs the website's dependencies on first run (web/node_modules missing).
 * - Starts the Next.js dev server for the website on all network interfaces, so it can be
 *   opened from this PC, from the Android emulator, and from an Android phone on the same Wi-Fi.
 *
 * The native Android app (./app) is built separately with Android Studio / Gradle and is not
 * affected by this script.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { networkInterfaces } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const webDir = join(root, "web");
const isWindows = process.platform === "win32";
const npm = isWindows ? "npm.cmd" : "npm";
import { createServer } from "node:net";

/** Resolves to `start` if it's free on all interfaces, otherwise the next free port. */
function findFreePort(start, attempts = 20) {
  return new Promise((resolve, reject) => {
    const tryPort = (p, left) => {
      const srv = createServer();
      srv.once("error", (err) => {
        if (err.code === "EADDRINUSE" && left > 0) tryPort(p + 1, left - 1);
        else reject(err);
      });
      srv.once("listening", () => srv.close(() => resolve(p)));
      srv.listen(p, "0.0.0.0");
    };
    tryPort(start, attempts);
  });
}

const requestedPort = Number(process.env.PORT || 3000);
const port = String(await findFreePort(requestedPort));
if (port !== String(requestedPort)) {
  console.log(`\n[bengal-sky] Port ${requestedPort} is already in use (another dev server still running?). Using ${port} instead.`);
}

if (!existsSync(join(webDir, "node_modules", "next"))) {
  console.log("\n[bengal-sky] Installing website dependencies (first run)...\n");
  const install = spawnSync(npm, ["install"], { cwd: webDir, stdio: "inherit", shell: isWindows });
  if (install.status !== 0) {
    console.error("[bengal-sky] npm install failed in ./web");
    process.exit(install.status ?? 1);
  }
}

const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((a) => a && a.family === "IPv4" && !a.internal)
  .map((a) => a.address);

console.log("\n[bengal-sky] Starting the Bengal Sky website");
console.log(`  This PC:            http://localhost:${port}`);
console.log(`  Android emulator:   http://10.0.2.2:${port}`);
for (const ip of lanAddresses) {
  console.log(`  Phone on same Wi-Fi: http://${ip}:${port}`);
}
console.log("  (Browsers only allow GPS on localhost/https; over LAN the site falls back to Dhaka / search.)\n");

const nextBin = join(webDir, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, "dev", "-H", "0.0.0.0", "-p", port], {
  cwd: webDir,
  stdio: "inherit",
});

const forward = (signal) => () => child.kill(signal);
process.on("SIGINT", forward("SIGINT"));
process.on("SIGTERM", forward("SIGTERM"));
child.on("exit", (code) => process.exit(code ?? 0));
