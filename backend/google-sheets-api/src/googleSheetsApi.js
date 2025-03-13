const { google } = require("googleapis");
const { Storage } = require("@google-cloud/storage");

async function getProjects(sheetId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./secrets.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "projects",
  });

  const rows = res.data.values;
  let attributes = rows[0];
  let json = { projects: [] };

  for (let row = 1; row < rows.length; row++) {
    let project = {};

    // foreach attribute, create a project property and populate with value with corresponding column and row
    for (let attr = 0; attr < attributes.length; attr++) {
      project[attributes[attr]] = rows[row][attr];
    }

    json.projects.push(project);
  }

  return await getImages(json);
}

async function getImages(json) {
  const storage = new Storage();

  const bucket = storage.bucket("thijmen_pelgrom_web");
  const data = await bucket.getFiles();
  const files = data[0];

  json.projects.forEach((project) => {
    project.imgs = [];
    files.forEach((file) => {
      // get foldername from google storage file
      const fileName = file.metadata.name;
      const regex = "/";

      const i = fileName.search(regex);
      folderName = fileName.slice(0, i);

      if (folderName == project.img_folder_name) {
        project.imgs.push({
          name: file.metadata.name,
          mediaLink: file.metadata.mediaLink,
          metadata: file.metadata.metadata,
        });
      }
    });
  });

  return json;
}

module.exports = {
  getProjects: getProjects,
};
