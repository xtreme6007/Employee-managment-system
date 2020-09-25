var mysql = require("mysql2");
var inquirer = require("inquirer");
const cTabel = require("console.table");
const { allowedNodeEnvironmentFlags, exit } = require("process");
var figlet = require("figlet");
var asciimo = require('asciimo').Figlet;
var colors = require('colors'); // add colors for fun
const { firebrick } = require("color-name");
art();

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

// first question prompt to see what the user wants to do
function start() {
  
  
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add",
          "View",
          "Update employee role",
          "Delete",
          "Exit"

        ]
      }
    ])
    .then(answers => {
      // switch next function based on user response
      switch (answers.action) {
        case "Add":
          add()
          break;
        case "View":
          view()
          break;
        case "Update employee role":
          update()
          break;
          case "Delete":
          remove()
            break;
        case "Exit":
          exit()
          break;
      }
    })
    .catch(error => {
      if (error.isTtyError) {

      } else {

      }
    });

};
// if user decides to add
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
          break;
        default: exit();

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
        type: "rawlist",
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
          viewEmployees();
          start();
        }
      );


    })
    .catch(error => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log(error);
      }
    });


}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "Please enter the name of the new department"

      }
    ])
    .then(answers => {
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.newDept
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " New department inserted!\n");
          viewDepartments();
          start();
        }
      );

    })
    .catch(error => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log(error);
      }
    });


}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter the title for the new role"

      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary for this role"

      },
      {
        type: "input",
        name: "department_id",
        message: "Please enter the department id for this role"


      }
    ])
    .then(answers => {

      var query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id


        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " New role inserted!\n");
          viewRoles();
          start();
        }
      );

    })
    .catch(error => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log(error);
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
          break;
        case "Roles":
          viewRoles();
          break;
        case "Departments":
          viewDepartments();
          break;
        default:
          exit();

      }
    })
    .catch(error => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log(error);
      }
    });

}
// function to veiw employees
function viewEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, employee.id, role.title, role.salary, role.department_id FROM employee INNER JOIN role on employee.role_id = role.department_id;", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();

  });

}
// if user wants to view what roles
function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    //if (err) throw err;

    console.table(res);
    start()

  });

}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    console.table(res);
    start();
  });

}
 
function art() {
  var font = 'larry3d';
// set text we are writeing to turn into leet ascii art
var text = "Welcome";

  asciimo.write(text, font, function(art){
    console.log(art.green);
    
  });
}

function update() {

 
  connection.query("SELECT first_name FROM employee", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"employee",
        message: "Please select employee to update",
        choices: res.map(emp => emp.first_name)
      }
    ])
    .then(answers => {
      findRole(answers.employee);
      start();
  
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
    

  });


} 

function findRole(name) {
  connection.query("SELECT department_id  FROM role", function (err, res) {
    if (err) throw err;
    console.log(res);

    inquirer
    .prompt([
      {
        type: "list",
        name:"role",
        message: "Please select desired role to update",
        choices: res.map(role => role.department_id)
      }
    ])
    .then(answers => {let sql = "UPDATE employee SET role_id = ? WHERE first_name = ?";
    let role = parseInt(answers.role);
    let data = [role, name];

// execute the UPDATE statement
connection.query(sql, data, (error, results, fields) => {
if (error){
return console.error(error.message);
}

});
      

    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
  });
}

function remove() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "removeAction",
        message: "What would you like to remove?",
        choices: ["Employee", "Department", "Role"]
      }
    ])
    .then(answers => {
      switch (answers.addAction) {
        case "Employee":
          fireWho()
          break;
        case "Department":
          removeDepartment()
          break;
        case "Role":
          removeRole()
          break;
        default: exit();

      }
    })

}

function fireWho() {

  connection.query("SELECT first_name FROM employee", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"exEmployee",
        message: "Please select employee to Fire",
        choices: res.map(emp => emp.first_name)
      }
    ])
    .then(answers => {
      removeEmployee(answers.exEmployee)
      start();
  
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
    

  });





}

function removeEmployee(exEmployee) {



  
}










