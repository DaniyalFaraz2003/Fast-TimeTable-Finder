const express = require("express");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const bodyParser = require("body-parser");
const { google } = require("googleapis");

const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// app.use("/", require("./routes/root"));

app.get("/home", (req, res) => {
  res.send("Hello World");
});

// test code for the google sheets api
app.get("/", async (req, res) => {
  const sheetId = "1feZLJJN4NDjAnqA8J5vHnVGrl9R91-NFGOqAW0gU5h4";
  const outputPath = "timetableFile/timetable.xlsx";

  const auth = new google.auth.GoogleAuth({
    keyFile: "key.json", // Path to your credentials file
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const fileId = sheetId;
  const client = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: client });

  try {
    const exportOptions = {
      fileId: fileId,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };

    const response = await drive.files.export(exportOptions, {
      responseType: "stream",
    });

    const dest = fs.createWriteStream(outputPath);
    response.data
      .on("error", (err) => console.error("Error downloading file:", err))
      .pipe(dest);

    console.log(`Google Sheet downloaded successfully to ${outputPath}`);
  } catch (error) {
    console.error("Error downloading Google Sheet:", error);
  }
  res.send("done");
});

// test code ends here

app.use("*", (req, res) => {
  res.status(404).send("Sorry the resource you want is not on the server");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
