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
      if (data.choice === "Add employee") {
        addEmployee();
      } else if (data.choice === "Add role") {
        addRole();
      } else if (data.choice === "Add department") {
        addDepartment();
      } else if (data.choice === "View all departments") {
        viewAllDepartments();
      } else if (data.choice === "View all roles") {
        viewAllRoles();
      } else if (data.choice === "View all employees") {
        viewAllEmployees();
      } else if (data.choice === "Update employee roles") {
        updateEmployeeRoles();
      } else if (data.choice === "Exit") {
        connection.end();
      }
    });
}

function addEmployee() {
  console.log("Let's add a new employee");
  connection
    .promise()
    .query("select * from department")
    .then((data) => {
      const depts = data[0];
      const roleArray = [];
      for (i = 0; i < depts.length; i++) {
        const dept = depts[i];
        const choice = { name: dept.name, value: dept.id };
        roleArray.push(choice);
      }
      connection
        .promise()
        .query("select * from employee")
        .then((data) => {
          const depts = data[0];
          const managerArray = [];
          for (i = 0; i < depts.length; i++) {
            const dept = depts[i];
            const choice = { name: dept.name, value: dept.id };
            managerArray.push(choice);
          }
          managerArray.push({ name: "none", value: null });
          inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is your first name?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is your last name?",
              },
              {
                type: "list",
                name: "role_id",
                message: "Choose your role.",
                choices: roleArray,
              },
              {
                type: "list",
                name: "manager_id",
                message: "Choose your manager.",
                choices: managerArray,
              },
            ])
            .then((answers) => {
              console.log(answers);
              connection
                .promise()
                .query("INSERT INTO employee SET ?", answers)
                .then((res) => {
                  console.log("A new employee has been added");
                  choices();
                });
            });
        });
    });
}

function addRole() {
  console.log("Let's add a new role");
  connection
    .promise()
    .query("select * from department")
    .then((data) => {
      const depts = data[0];
      const choiceArray = [];
      for (i = 0; i < depts.length; i++) {
        const dept = depts[i];
        const choice = { name: dept.name, value: dept.id };
        choiceArray.push(choice);
      }

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the role's salary?",
          },
          {
            type: "list",
            name: "department_id",
            message: "Choose a department for this role.",
            choices: choiceArray,
          },
        ])
        .then((answers) => {
          console.log(answers);
          connection
            .promise()
            .query("INSERT INTO role SET ?", answers)
            .then((res) => {
              console.log("Department has been added");
              choices();
            });
        });
    });
}

function addDepartment() {
  console.log("Let's add a new department");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      connection
        .promise()
        .query("INSERT INTO department SET ?", answers)
        .then((res) => {
          console.log("Department has been added");
          choices();
        });
    });
}

function viewAllDepartments() {
  // console.log("Let's view all of the departments");
  connection
    .promise()
    .query("select * from department")
    .then((data) => {
      var dep = data[0];
      console.table(dep);
      choices();
    });
}

function viewAllRoles() {
  console.log("Let's view all of the roles");
  connection
    .promise()
    .query("select * from role")
    .then((data) => {
      var role = data[0];
      console.table(role);
      choices();
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

function updateEmployeeRoles() {
  console.log("Let's update some employee roles");
}

choices();
