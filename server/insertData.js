const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./db");

//Read data from csv file, parse beginning on line 3, push data into sqlite database
fs.createReadStream("./data/timesheet_data.csv")
  .pipe(parse({ delimiter: ",", from_line: 3 }))
  .on("data", function (row) {
    db.serialize(function () {
      db.run(
        `INSERT INTO timesheet VALUES ((?),(?),(?),(?),(?),(?),(?),(?),(?))`,
        [
          row[0],
          row[1],
          row[2],
          row[3],
          row[4],
          row[5],
          row[6],
          row[7],
          row[8],
        ],
        function (error) {
          if (error) {
            return console.log(`ERROR IN INSERTDATA: ${error.message}`);
          }
          console.log(`Inserted a row with the id: ${this.lastID}`);
        }
      );
    });
  });
