const fs = require("fs");
const dbFile = "./data/timesheet.db";

fs.unlink(dbFile, (error) => {
  if (error) {
    return console.error(`ERROR WHILE DELETING DATABASE: ${error.message}`);
  }
  console.log(`Deleted database file: ${dbFile}`);
});

// return new Promise((resolve, reject) => {
//   fs.unlink(dbFile, (error) => {
//     if (error) {
//       console.log(error)
//       reject(error);
//     } else { 
//       console.log(`Deleted database file: ${dbFile}`);
//       resolve();
//     }
//   });
// });
