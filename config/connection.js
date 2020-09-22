const mysql= require("mysql2");

const connection= mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "B27357_c3631",
    database: "employee_tracker"
});

connection.connect((err)=> {
    if(err) {
        console.error("error connecting: " + err.stack);
        return;        
    }
    console.log("connected as id" + connection.threadId);
});

module.exports= connection;