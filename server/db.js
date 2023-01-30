const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./data/timesheet.db";

function connectToDatabase() {
  // If the file path already exists, create a new database object
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    //If filepath does not exist, create the table
    const database = new sqlite3.Database(filepath, (error) => {
      if (error) {
        //Outputs error message to the console, but will not return a value
        return console.error(`ERROR IN DATABASE CONNECTION: ${error.message}`);
      }
      createTable(database);
      console.log("Connected to the database successfully");
    });
    return database;
  }
}

//When the data in inserted into the database, there is no variable in the csv file to ensure no entries are duplicated
//To fix this, I would insert a new column in the CSV file for an id variable
//When creating the table, require the id to be unique. This would prevent duplicate entries from being submitted.
function createTable(database) {
  database.exec(`
  CREATE TABLE timesheet
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    client TEXT NOT NULL,
    project TEXT NOT NULL,
    project_code TEXT NOT NULL,
    hours REAL NOT NULL,
    billable TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    billable_rate INTEGER NOT NULL
  )
`);
}
module.exports = connectToDatabase();
