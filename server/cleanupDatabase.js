const fs = require("fs");
const dbFile = "./data/timesheet.db";

fs.unlink(dbFile, (error) => {
  if (error) {
    return console.error(`ERROR WHILE DELETING DATABASE: ${error.message}`);
  }
  console.log(`Deleted database file: ${dbFile}`);
});
