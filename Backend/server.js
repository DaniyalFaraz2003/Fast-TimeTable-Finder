const express = require("express");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const fs = require('fs');
const { authenticate } = require("google-auth-library");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(logger);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// app.use("/", require("./routes/root"));

app.get("/home", (req, res) => {
    res.send("Hello World");
})

// test code for the google sheets api
app.get("/", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "key.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    // create client instance for auth
    const client = await auth.getClient();

    //instance of google sheets api
    const googleSheets = google.sheets({
        version: "v4", auth: client
    })

    const spreadsheetIdLocal = "11Vo63U0mdIj_pTp0QQKZv7rtWXrycgJ9-uEE7Jfejqc"; // change this id for another spreadsheet
    const spreadsheetIdCloud = "1feZLJJN4NDjAnqA8J5vHnVGrl9R91-NFGOqAW0gU5h4"; // change this id for another spreadsheet
    // get metadata about the spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
        auth, spreadsheetId: spreadsheetIdCloud
    })

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadsheetIdCloud,
        range: "Monday",
    })


})

app.get("/download", async (req, res) => {
    // Replace with your own credentials file path
    const credentialsPath = 'key.json';

    // Replace with the Google Sheets document ID
    const sheetId = '11Vo63U0mdIj_pTp0QQKZv7rtWXrycgJ9-uEE7Jfejqc';

    // Replace with the destination path on your computer
    const destinationPath = './TimeTableFile/Time-Table.xlsx';

    try {

        const auth = new google.auth.GoogleAuth({
            keyFile: credentialsPath,
            scopes: 'https://www.googleapis.com/auth/drive.file',
        });
        const drive = google.drive({ version: 'v3', auth });

        var dest = fs.createWriteStream(destinationPath);  // Please set the filename of the saved file.
        drive.files.export(
            { fileId: sheetId, alt: "media", mimeType: 'application/vnd.google-apps.spreadsheet' },
            { responseType: "stream" },
            (err,  data  ) => {
                if (err) {
                    console.log(err);
                    return;
                }
                data
                    .on("end", () => console.log("Done."))
                    .on("error", (err) => {
                        console.log(err);
                        return process.exit();
                    })
                    .pipe(dest);
            }
        );
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// test code ends here

app.use('*', (req, res) => {
    res
        .status(404)
        .send("Sorry the resource you want is not on the server");
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})