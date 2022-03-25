const { prompt } = require("inquirer");
const db = require("./db/connection");
require("console.table");

/*
when the application starts
then run main menu

menu options

-view all departments
-view all roles
-view all employees
-add a department
-add a role
-add an employee
-update employee role

when an option is selected
then run a function for the option
when the function completes
then run main menu again
*/

function mainMenu() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Quit",
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "View All Departments":
        viewDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "Add Role":
        addRole();
        break;
      default:
        quit();
    }
  });
}

const viewEmployees = () => {
    db.query("SELECT * FROM employee", (err, data) =>{
        console.table(data);
        mainMenu();
    })
}; 

const addEmployee = () => {
    createEmployee(employee)
    db.query("INSERT INTO employee SET ?", employee);
    console.table(data);
    mainMenu();
};

const viewDepartments = () =>{
    db.query("SELECT * FROM department", (err, data) =>{
    console.table(data);
    mainMenu();
    })
};

const addDepartment = () => {
    createDepartment(department)
    db.query("INSERT INTO employee SET ?", department);
    console.table(data);
    mainMenu();
};
 
const viewRoles = () => {
    db.query("SELECT * FROM roles", (err, data) =>{
        console.table(data);
        mainMenu();
    })
}; 

const addRole = () => {
    createRole(role)
    db.query("INSERT INTO employee SET ?", role);
    console.table(data);
    mainMenu();
};


mainMenu();