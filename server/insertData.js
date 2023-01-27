const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./db");

//Read data from csv file, parse beginning on line 3, push data into sqlite database
fs.createReadStream("./data/timesheet_data.csv")
  .pipe(parse({ delimiter: ",", from_line: 3 }))
  .on("data", function (data) {
    db.serialize(function () {
      db.run(
        `INSERT INTO timesheet (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) VALUES ((?),(?),(?),(?),(?),(?),(?),(?),(?))`,
        [
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
        ],
        function (error) {
          if (error) {
            return console.log(`ERROR WHILE INSERTING DATA: ${error.message}`);
          }
          console.log(`Inserted a row with the id: ${this.lastID}`);
        }
      );
    });
  });
