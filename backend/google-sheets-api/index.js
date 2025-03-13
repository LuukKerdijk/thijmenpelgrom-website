const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const fs = require("fs");
const googleSheetsApi = require("./src/googleSheetsApi.js");

const googleSheetsApiKey = defineSecret("GOOGLE_SHEETS_KEY");
const sheetId = defineString("SHEET_ID");

exports.getProjects = onRequest(
  { region: "europe-west4", cors: true, secrets: [googleSheetsApiKey] },
  async (req, res) => {
    fs.writeFileSync("./secrets.json", googleSheetsApiKey.value());
    res.status(200).send(await googleSheetsApi.getProjects(sheetId.value()));
  },
);
