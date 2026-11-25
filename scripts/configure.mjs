import { readFileSync, writeFileSync } from "node:fs";
import { parseEnv } from "node:util";

const envFile = new URL("../.env", import.meta.url);
const outFile = new URL("../public/app-config.js", import.meta.url);
let env;
try {
  env = parseEnv(readFileSync(envFile, "utf8"));
} catch (error) {
  console.error("Cannot read .env. Copy .env.example to .env and fill in the configuration.");
  process.exit(1);
}
const get = (key) => (env[key] || "").trim();
const required = ["FIREBASE_API_KEY", "FIREBASE_AUTH_DOMAIN", "FIREBASE_PROJECT_ID", "FIREBASE_APP_ID", "FIREBASE_MESSAGING_SENDER_ID"];
const missing = required.filter((key) => !get(key));
if (missing.length) {
  console.error("Missing required Firebase settings: " + missing.join(", "));
  process.exit(1);
}
const firebase = {
  apiKey: get("FIREBASE_API_KEY"),
  authDomain: get("FIREBASE_AUTH_DOMAIN"),
  projectId: get("FIREBASE_PROJECT_ID"),
  appId: get("FIREBASE_APP_ID"),
  messagingSenderId: get("FIREBASE_MESSAGING_SENDER_ID")
};
for (const [key, variable] of Object.entries({
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  databaseURL: "FIREBASE_DATABASE_URL",
  measurementId: "FIREBASE_MEASUREMENT_ID"
})) {
  if (get(variable)) firebase[key] = get(variable);
}
const drive = {
  clientId: get("GOOGLE_DRIVE_CLIENT_ID"),
  folderId: get("GOOGLE_DRIVE_FOLDER_ID")
};
if (drive.clientId && !drive.clientId.endsWith(".apps.googleusercontent.com")) {
  console.error("GOOGLE_DRIVE_CLIENT_ID must be a Google OAuth web client ID, not a client secret.");
  process.exit(1);
}
if (Object.values(firebase).some((value) => value.startsWith("GOCSPX-"))) {
  console.error("An OAuth client secret must never appear in browser configuration.");
  process.exit(1);
}
const config = { firebase, drive };
writeFileSync(outFile, "// Generated from .env. Do not commit. Browser-visible configuration only.\nwindow.FYP_CONFIG = " + JSON.stringify(config, null, 2) + ";\n", "utf8");
console.log("Generated public/app-config.js. Google Drive uploads: " + (drive.clientId ? "enabled" : "disabled"));
