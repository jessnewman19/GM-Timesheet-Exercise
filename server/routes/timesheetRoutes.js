const express = require("express");
const {
  postEntry,
  getAllEntries,
} = require("../controllers/timesheetController");

const router = express.Router();

router.post("/", postEntry);
router.get("/", getAllEntries);

//When route is not found, execute
router.all("*", (req, res) => {
  res.status(404).json("Route not found");
});

//This is a reference to the router object. Creating new reference to the same object.
module.exports = router;
