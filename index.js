// Loads my sql module
const mysql = require("mysql2");
// Require and configure dotenv
require("dotenv").config();
// Creates connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "employee_DB",
});
// Handles error if the connection to the client fails
connection.connect((err) => {
  if (err) throw err;
});
// Launching the prompt interface (using inquirer.prompt) with our object that will wait for the user's choice
function choices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose one of the options",
        choices: ["View all employees"],
      },
    ])
    .then((data) => {
      if (data.choice === "View all employees") {
        viewAllEmployees();
      }
    });
}
