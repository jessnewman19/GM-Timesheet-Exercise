const express = require("express");
const cors = require("cors");
const routes = require("./routes/timesheetRoutes");
//Creates the database when the server is started
const execSync = require("child_process").execSync;
// eslint-disable-next-line no-unused-vars
const insertData = require("./insertData");
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Use routes defined in timesheetRoutes.js
app.use("/", routes);

//Create the database when the server is started
execSync("node insertData.js");

//Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//Clean up database when server is shutdown
process.on("SIGINT", () => {
  require("./cleanupDatabase.js");
  process.exit();
});
