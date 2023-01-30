# Giant Machines Timesheet Exercise
Timesheet application built using Node.js and React.

## Installation instructions for MacOS
**Server**

1. Navigate into server directory 
```
cd server
```
2. Install dependencies (See below for a complete list of dependencies)
```
npm install
```
3. Run server. Upon starting the server, the database will be created. Please note, there is no unique variable in the CSV file to prevent duplicate entries from being entered. If a file is changed/saved, nodemon will automatically restart the server and the data will insert into the table again. If this occurs, please shut down the server (control + c) and restart it.
```
npm run dev
```

To shut down the server, hit control + c in the terminal.


**Client**

1. Navigate into the client directory
```
cd client
```
2. Navigate into GM-Timesheet-Exercise 
```
cd GM-Timesheet-Exercise
```
3. Install dependencies 
```
npm install
```
4. Start the application
```
npm run dev
```
5. Navigate to http://localhost:5173/

To shut down the application, hit control + c in the terminal.

## User Stories
* A user can view a table that displays consolidated information from the timesheet database
* A user can view the total number of hours tracked and the total billable amount

## Post New Entry
* To create a new timesheet entry, utilize Postman to post a new request to http://localhost:4000/.
* Ensure the Content/Type header is set to application/json and JSON is selected for the body
* Submit information for all fields (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate). *A unique ID will automatically generate*
* When the application is refreshed, the new entry will appear.

## Server Dependencies 
  * [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  * [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 * [Cors](https://github.com/expressjs/cors#readme)
 * [CSV](https://github.com/adaltas/node-csv)
 * [Express](https://expressjs.com/en/starter/installing.html)
 * [Nodemon](https://github.com/remy/nodemon) 
 * [Sqlite3](https://github.com/TryGhost/node-sqlite3) (If you have having issues with installing Sqlite3, trying using **npm install --save sqlite3**)

 ## Application Dependencies 
 * [Prop-Types]() (If you have having issues installing Prop Types, try using **npm install --save prop-types**)