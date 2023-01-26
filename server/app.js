const express = require("express");
const routes = require("./routes/timesheetRoutes");

const app = express();
app.use(express.json());

//Use routes defined in timesheetRoutes.js
app.use("/", routes);

//Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
