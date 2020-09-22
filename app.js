const inquirer = require("inquirer");
const orm = require("./config/orm");
const { viewEmployees } = require("./config/orm");



// First we need to call a function in charge of starting the general CLI

function createCMS()  {
  inquirer
    .prompt([
      {
      type: "list",
      name: "addViewOrUpdate",
      message: "What would you like to do?",
      choices: ["Add Department", "Add Employee", "Add Role",
       "View Departments", "View Roles", "View Employees", "Update Roles", "N/A"],
      validate: answer => {
        console.log(answer);
        if (answer === "N/A") {
          return answer;
        }
      }
    }
  ]).then(answers => {
    switch(answers.addViewOrUpdate) {
      case "Add Department":
        addDepartment();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Add Role":
        addRole();
        break;
      case "View Departments":
        orm.viewDepartments();
        break;
      case "View Employees":
        orm.viewEmployees();
        break;
      case "View Roles":
        orm.viewRoles();
        break;
      case "Update Roles":
        updateEmployeeRole();
        break;
      case "N/A":
        return;

    }
  })
}

createCMS();

function addDepartment() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the department name?",
      name: "department",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Enter a valid department name";
      }
    }
  ]).then(answer => {
  orm.addDepartment(answer.department);
    createCMS();
  })
}

// function to add an employee to the db, not sending data though
function addEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the first name of the employee?",
      name: "employeeFirstName",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Enter a valid employee name.";
      }
    },
    {
      type: "input",
      message: "What is the last name of the employee?",
      name: "employeeLastName",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Enter a valid employee name.";
      }
    },
    {
  
      type: "list",
      message: "What is the role of the employee?",
      name: "employeeRoleID",
      choices: ["1","2"],
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Enter a valid role."
      }
    },
    {
      type: "input",
      message: "What is the ID of their manager?",
      name: "employeeManager"
    }
  ]).then(answer => {
    orm.addEmployee(answer.employeeFirstName, answer.employeeLastName, 
      answer.employeeRoleID, answer.employeeManager);
    orm.viewEmployees();
    createCMS();
  })
}

// function to add a new role to the database, not breaking, but isn't sending 
// data to mysql
function addRole() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the title of the role?",
      name: "roleTitle"
    },
    {
      type: "input",
      message: "What is the salary of this role?",
      name: "roleSalary"
    },
    {
      type: "input",
      message: "What is the ID of the department this role belongs to?",
      name: "departmentId"
    }
  ]).then(answer => {
    orm.addRole(answer.roleTitle, answer.roleSalary, answer.departmentId);
    createCMS();
  })
}

/**@todo
 * create updateEmployeeRole();
 */

 function updateEmployeeRole() {
   inquirer
   .prompt([
     {
       type: "input",
       message: "Which employee's role would you like to update?",
       name: "updateEmployee"
     },
     {
       type: "input",
       message: "What would you like to change their role ID to?",
       name: "newEmployeeRoleID"
     }
   ]).then(answer => {
     orm.updateEmployee(answer.updateEmployee, answer.newEmployeeRoleID);
     createCMS();
   })
 }

