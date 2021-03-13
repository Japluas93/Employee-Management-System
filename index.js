// inquirer is a Node standard library package for asking questions, parsing input, and validating answers
const inquirer = require("inquirer");
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
        choices: [
          "Add employee",
          "Add role",
          "Add department",
          "View all departments",
          "View all roles",
          "View all employees",
          "Update employee roles",
          "Exit",
        ],
      },
    ])
    .then((data) => {
      if (data.choice === "View all employees") {
        viewAllEmployees();
      } else if (data.choice === "Add employee") {
        addEmployee();
      } else if (data.choice === "Add role") {
        addRole();
      } else if (data.choice === "Add department") {
        addDepartment();
      }
    });
}
// Performs a query that selects all of the employees from the database
// The data is called (with the .then method) and gets printed to the console
function viewAllEmployees() {
  connection
    .promise()
    .query("select * from employee")
    .then((data) => {
      var emp = data[0];
      console.table(emp);
      choices();
    });
}

function addEmployee() {
  console.log("Let's add a new employee");
}

function addRole() {
  console.log("Let's add a new role");
}

choices();
