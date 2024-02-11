const fs = require("fs")
const JSONStream = require("JSONStream");

/*
This function is designed to just extract the data from the file which we need currently therefore eliminating the extra processing to first load the whole object to memory
*/

const getData = async (req, res) => {
    const stream = fs.createReadStream("./timetableFile/timetabledata.json");  // first create a read stream of the data file

    stream.on("error", err => { // handling the errors
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            err: err
        })
    })
    const jsonStream = stream.pipe(JSONStream.parse('Degrees')); // extracting only the field which is required currently 

    jsonStream.on("data", data => {
        res.json(data); // Sending only the 'Degree' field
    });
}

module.exports = getData;