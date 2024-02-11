const getData = require("../controllers/getdata");
const getTimetable = require("../controllers/gettimetable");
const express = require("express");
const router = express.Router();

router.route("/data").get(getData);
router.route("/timetable").get(getTimetable);


module.exports = router;