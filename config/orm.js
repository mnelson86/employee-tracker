const connection= require("./connection");
const {query}= require("express");

class DB {
    constructor(connection) {
        this.connection= connection;
    }
}

let orm= {viewDepartments: function() {
    let queryString= "SELECT * from department";
    connection.query(queryString, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
},

viewEmployees: function() {
    let queryString = "SELECT * from employee";
    connection.query(queryString, (err, result) =>{
        if (err) throw err;
        console.log(result);
    });
},
viewRoles: function(){
    let queryString= "SELECT * from role";
    connection.query(queryString, (err, result) =>{
        if (err) throw err;
        console.log(result);
    });
},
addDepartment: function(departmentName){
    let queryString= "INSERT INTO department (departmentName) VALUES(?)";
    connection.query(queryString, departmentName, (err, result) =>{
        if (err) throw err;
        console.log(result);
    })
},
addEmployee: function(firstName, lastName, role_id, manager_id) {
    let queryString= "INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES(?,?,?,?)";
    connection.query(queryString, [firstName, lastName, role_id, manager_id], (err, result) => {
        if (err) throw err;
        console.log(result);
      })
},
addRole: function(roleTitle, roleSalary, departmentId) {
    console.log(roleTitle, roleSalary, departmentId);
    let queryString = "INSERT INTO role (title, salary, department_id) VALUES(?,?,?)";
    console.log(queryString);
    connection.query(queryString, [roleTitle, roleSalary, departmentId], (err, result) => {
      if (err) throw err;
      console.log(result);
    })
},
updateEmployee: function(employeeID, newEmployeeRoleID){
    console.log(employeeID + "...." + newEmployeeRoleID);
    let queryString = "UPDATE employee SET role_id = ? WHERE id = ?";
    console.log(queryString);
    connection.query(queryString, [newEmployeeRoleID, employeeID], (err, result) => {
      if (err) throw err;
      console.log(result);
    })
  }

}

module.exports = orm;