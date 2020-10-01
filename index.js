var mysql = require("mysql2");
var inquirer = require("inquirer");
const cTabel = require("console.table");
const { allowedNodeEnvironmentFlags, exit } = require("process");
var figlet = require("figlet");
var asciimo = require('asciimo').Figlet;
var colors = require('colors'); // add colors for fun
const { firebrick } = require("color-name");


art();
// Create conectection variable
var connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
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
// if user wants to add department
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
      // creat query connection to insert in to table
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.newDept
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " New department inserted!\n");
          
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
// if user wants to add role
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
// query data for inserting role into data
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
          "Total total utilized budget",
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
          case "Total total utilized budget":
          viewBudget();
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

 
  connection.query("SELECT first_name, id FROM employee", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"employee",
        message: "Please select employee to update",
        choices: res.map(emp => emp.id + " " + emp.first_name)
      }
    ])
    .then(answers => {
      changeRole(answers.employee);
      
  
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
    

  });


} 

function changeRole(name) {
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
  start()
}
// if user wants remove
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
      switch (answers.removeAction) {
        case "Employee":
          fireWho()
          break;
        case "Department":
          findDepartment()
          break;
        case "Role":
          findRole()
          break;
        default: exit();

      }
    })

}
// if user wants to remove employee
function removeEmployee(exEmployee) {
  
  console.log("Promoting Employee to customer\n");
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      id: exEmployee
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Employee is now a Consumer!\n");
      start();
     
    }
  );
}

// if employee wants to remove employe from database
function fireWho() {
// query to select from table in order to generate employees as choices
  connection.query("SELECT id, first_name FROM employee", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"exEmployee",
        message: "Please select employee to Fire",
        choices: res.map(emp => emp.id + " " + emp.first_name)
      }
    ])
    .then(answers => {
      removeEmployee(answers.exEmployee)
      
  
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
  });
}

// if user wants to delete a department
function removeDep(oldDep) {
  
  console.log("Deleting department\n");
  connection.query(
    "DELETE FROM department WHERE ?",
    {
      name: oldDep
    },
    function(err, res) {
      if (err) throw err;
      console.log("Department removed!\n");
      start();
     
    }
  );
}


// function to find departments and list them as choices for inquierer
function findDepartment() {

  connection.query("SELECT name FROM department", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"oldDep",
        message: "Please select Department to remove",
        choices: res.map(dep => dep.name)
      }
    ])
    .then(answers => {
      removeDep(answers.oldDep);
      
  
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
  });
}


// function to remove role from database
function removeRole(oldRole) {
  
  console.log("Removing role!\n");
  // query to delete
  connection.query(
    "DELETE FROM role WHERE ?",
    {
      title: oldRole
    },
    function(err, res) {
      if (err) throw err;
      console.log("Role removed!\n");
      start();
     
    }
  );
}

// function to find roles and and present them as choices for inquirer
function findRole() {

  connection.query("SELECT title FROM role", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"oldrole",
        message: "Please select roll to remove",
        choices: res.map(role => role.title)
      }
    ])
    .then(answers => {
      removeRole(answers.oldRole)
      
  
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
  });
}

// function to view total budget of all emplyoees.
function viewBudget() {
// query to grab and add salraies for all employees currently in database and return the sum.
  connection.query(
    "SELECT SUM(salary) FROM employee INNER JOIN role on employee.role_id = role.department_id",
    
    function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );



}