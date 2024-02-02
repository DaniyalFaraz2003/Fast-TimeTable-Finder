const express = require("express");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.use('*', (req, res) => {
    res
        .status(404)
        .send("Sorry the resource you want is not on the server");
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})