const fs = require("fs");

const targetPath = "./src/environments/environment.ts";

// Get Vercel env variables
const envConfigFile = `export const environment = {
  production: true,
  rawgApiKey: ${JSON.stringify(process.env.RAWG_API_KEY || "")},
  apiUrl: ${JSON.stringify(process.env.API_URL || "https://api.rawg.io/api")},
  version_tag: ${JSON.stringify(process.env.VERSION_TAG || "1.0.0")}
};
`;

// Write to environment.ts
fs.writeFileSync(targetPath, envConfigFile);
console.log(`environment.ts generated successfully at ${targetPath}`);
