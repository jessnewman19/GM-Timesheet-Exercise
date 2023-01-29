# Giant Machines Timesheet Exercise

## Installation instructions using MacOS
**Server**

1. Navigate into server directory 
```
cd server
```
2. Run insertData.js file to create database with timesheet information
```
node insertData.js
```
3. Run server
```
npm run dev
```

To shut down server, hit control + c.


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

## User Stories
* A user can view a table that displays consolidated information from the timesheet database
* A user can view the total number of hours tracked and the total billable amount

## Post new entry
* To create a new timesheet entry, utilize Postman to post a new request to http://localhost:4000/.
* Ensure the Content/Type header is set to application/json and JSON is selected for the body
* Submit information for all fields (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate). *A unique ID will automatically generate*
* When the application is refreshed, the new entry will appear.

## Dependencies 
 * [Cors](https://github.com/expressjs/cors#readme)
 * [CSV](https://github.com/adaltas/node-csv)
 * [Express](https://expressjs.com/en/starter/installing.html)
 * [Nodemon](https://github.com/remy/nodemon) 
 * [Sqlite3](https://github.com/TryGhost/node-sqlite3)