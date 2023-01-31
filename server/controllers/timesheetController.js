const db = require("../db");

const postEntry = async (req, res) => {
  try {
    const result = await handleNewEntry(req.body);
    res.status(201).json({
      message: "Successfully created",
      data: result,
    });
  } catch (error) {
    //Error that is returned when one or more fields is not filled out
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Helper function for postEntry
const handleNewEntry = async (entry) => {
  return new Promise((resolve, reject) => {
    let lastID;
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
        //Passes the error to the catch function above
        if (error) reject(error);
        //Sets the id for the entry just posted to view in the console
        lastID = this.lastID;
        db.get(
          `SELECT * FROM timesheet WHERE id = ${lastID}`,
          function (error, row) {
            if (error) reject(error);
            console.log(`Inserted a row with the id: ${lastID}`);
            //Promise is successfully resolved
            resolve(row);
          }
        );
      }
    );
  });
};

const getAllEntries = (req, res) => {
  //Uses db.all method from database module, where db is a database connection instance. 
  //Takes a SQL query and callback function as arguments
  db.all("SELECT * FROM timesheet", (err, rows) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        results: rows.length,
        data: rows,
      });
    }
  });
};

module.exports = { postEntry, getAllEntries };
