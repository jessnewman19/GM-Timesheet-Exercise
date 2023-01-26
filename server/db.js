const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./data/timesheet.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const database = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(`ERROR IN DB: ${error.message}`);
      }
      createTable(database);
      console.log("Connected to the database successfully");
    });
    return database;
  }
}

function createTable(database) {
  database.exec(`
  CREATE TABLE timesheet
  (
    date VARCHAR(10) NOT NULL,
    client VARCHAR(50) NOT NULL,
    project VARCHAR(50) NOT NULL,
    project_code VARCHAR(20) NOT NULL,
    hours DOUBLE(10, 2) NOT NULL,
    billable VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    billable_rate INT(5) NOT NULL
  )
`);
}

module.exports = connectToDatabase();
