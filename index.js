var mysql = require("mysql2");
var inquirer = require("inquirer");
const { endianness } = require("os");

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
  

}


