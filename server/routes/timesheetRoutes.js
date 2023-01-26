const express = require("express");
const {
  postEntry,
  getAllEntries,
} = require("../controllers/timesheetController");

const router = express.Router();

router.post("/", postEntry);
router.get("/", getAllEntries);

module.exports = router;
