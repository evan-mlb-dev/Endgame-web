const fs = require("fs");

const targetPath = "./src/environments/environment.ts";

// Get Vercel env variables
const envConfigFile = `export const environment = {
  production: true,
  rawgApiKey: ${JSON.stringify(process.env.RAWG_API_KEY || "EMPTY_ENV_VAR")},
  apiUrl: ${JSON.stringify(process.env.API_URL || "EMPTY_ENV_VAR")},
  version_tag: ${JSON.stringify(process.env.VERSION_TAG || "v0.0.0")},
  "google.client.id": ${JSON.stringify(process.env.GOOGLE_CLIENT_ID || "EMPTY_ENV_VAR")},
  "google.client.secret": ${JSON.stringify(process.env.GOOGLE_CLIENT_SECRET || "EMPTY_ENV_VAR")},
};
`;

// Write to environment.ts
fs.writeFileSync(targetPath, envConfigFile);
console.log(`environment.ts generated successfully at ${targetPath}`);
