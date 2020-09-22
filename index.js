var mysql = require("mysql2");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});


function start() {
    inquirer
    .prompt([
      {
          type:"list",
          name: "action",
          message: "What would you like to do?",
          choices: ""
      }
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
    })
    .catch(error => {
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });

};