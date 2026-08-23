const fs = require("fs");

// env variables from Vercel
const targetPath = "./src/environments/environment.ts";

const envConfigFile = `export const environment = {
  production: true,
  rawgApiKey: '${process.env.RAWG_API_KEY || ""}',
  apiUrl: '${process.env.API_URL || "https://api.rawg.io/api"}'
  version_tag : '${process.env.VERSION_TAG}
};
`;

// write file
fs.writeFileSync(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`environment.ts généré avec succès dans ${targetPath}`);
  }
});
