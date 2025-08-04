const express = require('express');
const app = express();
const dotenv = require('dotenv');



const CONFIG = {
 
  GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID,
  GOOGLE_SHEETS_RANGE: process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A:E",
};
const facultydata = []

async function initGoogleSheets() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    return google.sheets({ version: "v4", auth });
  } catch (err) {
    console.error("Error initializing Google Sheets:", err);
    throw err;
  }
}



async function loadFacultyData() {
  try {
    if (!sheetsClient) {
      sheetsClient = await initGoogleSheets();
    }

    const now = Date.now();
    if (now - lastFetchTime < CACHE_TTL && facultyDataCache.length > 0) {
      return facultyDataCache;
    }

    const response = await sheetsClient.spreadsheets.values.get({
      spreadsheetId: CONFIG.GOOGLE_SHEETS_ID,
      range: CONFIG.GOOGLE_SHEETS_RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheet");
      return [];
    }

    const dataRows = rows[0][0] === "id" ? rows.slice(1) : rows;

    facultyDataCache = dataRows.map((row) => ({
      id: row[0] || "",
      name: row[1] || "",
      cabin_no: row[2] || "",
      mobile_no: row[3] || "",
      created_at: row[4] || "",
    }));

    lastFetchTime = now;
    console.log(
      `✅ Loaded ${facultyDataCache.length} faculty records from Google Sheets`
    );
    return facultyDataCache;
  } catch (err) {
    console.error("Error loading faculty data from Google Sheets:", err);
    return facultyDataCache.length > 0 ? facultyDataCache : [];
  }
}


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});