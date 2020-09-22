var mysql = require("mysql2");
var inquirer = require("inquirer");
const tabel = require("console.table");
const { allowedNodeEnvironmentFlags } = require("process");

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
      switch (answers.action) {
        case "Add Employee":
          addEmployee()
          break;
        case "View Employees":
          view()
          break;
        case "Update employee role":
          update()
          break;
        case "Exit":
          stop()
          break;
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        
      } else {
        
      }
    });

};

function add() {
  inquirer
  .prompt([
    {
      type: "list",
      name: "addAction",
      message: "What would you like to add?",
      choices: ["Employee", "Department", "Role"]
  }
  ])
  .then(answers => {
    switch (answers.addAction) {
      case "Employee":
        addEmployee()
        break;
      case "Department":
        addDepartment()
        break;
      case "Role":
        addRole()
        break ;
      default: stop();

    }
  })

}

// if user wants to add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter employees First Name"
      },
    {
        type: "input",
        name: "last_name",
        message: "Please enter employees Last Name"
      },
    {
        type: "input",
        name: "role_id",
        message: "Please enter the employees Role ID"
      },

      {
        type: "input",
        name: "manager_id",
        message: "Please enter the Manger Id Number"

      }
    ])
    .then(answers => {
      console.log("Inserting a new employee...\n");
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " Employee inserted!\n");
          
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

// if user wants to view
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


