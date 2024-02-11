const fs = require("fs")

const getTimetable = async (req, res) => {
    res.status(200).json({
        message: "ok", api: "timetable"
    })
}

module.exports = getTimetable;