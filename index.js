var mysql = require("mysql2");
var inquirer = require("inquirer");
const { endianness } = require("os");
const tabel = require("console.tabel")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});


function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add Employee",
          "View Employees",
          "Update employe role",
          "Exit"

        ]
      }
    ])
    .then(answers => {
      switch (action) {
        case "Add Employee":
          add();
        case "View Employees":
          view();
        case "Update employee role":
          update();
        case "Exit":
          stop();
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });

};

function add() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter employees name"
      }
    {
        type: "input",
        name: "role",
        message: "Please enter employees role"
      }
    {
        type: "input",
        name: "department",
        message: "Please enter the employees department id"
      }
    ])
    .then(answers => {
      console.log("Inserting a new employee...\n");
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          flavor: "Rocky Road",
          price: 3.0,
          quantity: 50
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes
          updateProduct();
        }
      );
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });


}


function view() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewAction",
        message: "What would you like to view?",
        choices: [
          "Employees",
          "Roles",
          "Departments",
          "View all"
        ]

      }
    ])
    .then(answers => {
      switch (answers.viewAction) {
        case "Employees":
          viewEmployees();
        case "Roles":
          viewroles();
        case "Departments":
          viewDepartments();
        case "View all":
          viewAll();

      }
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });

}


