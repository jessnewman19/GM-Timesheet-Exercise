const db = require("../db");

const postEntry = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Request body is empty",
    });
  }
  try {
    const result = await handleNewEntry(req.body);
    res.status(201).json({ message: result });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//Helper function for postEntry
const handleNewEntry = async (entry) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO timesheet (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        entry.date,
        entry.client,
        entry.project,
        entry.project_code,
        entry.hours,
        entry.billable,
        entry.first_name,
        entry.last_name,
        entry.billable_rate,
      ],
      function (error) {
        if (error) reject(error);
        console.log(this);
        console.log(`Inserted a row with the id: ${this.lastID}`);
        resolve`Inserted a row with the id: ${this.lastID}`;
      }
    );
  });
};

//Retrieve all timesheet entries from database
const getAllEntries = (req, res) => {
  db.all("SELECT * FROM timesheet", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ data: rows });
    }
  });
};

module.exports = { postEntry, getAllEntries };
