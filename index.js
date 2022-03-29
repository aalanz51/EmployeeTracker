const inquirer = require("inquirer");
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
  inquirer
    .prompt([
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
    ])
    .then((res) => {
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
  db.query("SELECT * FROM employee", (err, data) => {
    console.table(data);
    mainMenu();
  });
};

const addEmployee = () => {
  db.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    const managerOptions = data.map((employee) => {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });
    db.query("SELECT * FROM role", (err, data) => {
      if (err) throw err;
      const roleOptions = data.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is your first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is your last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleOptions,
          },
          {
            type: "list",
            name: "manager_id",
            
            message: "Who is the manager?",
            choices: managerOptions,
          },
        ])
        .then((input) => {
          console.log(input);
          const sql =
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
          const values = [input.first_name, input.last_name, input.role_id, input.manager_id];
          db.query(sql, values, (err, result) => {
            if (err) throw err;
            mainMenu();
          });
        });
    });
  });
};

const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, data) => {
    console.table(data);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is your department name?",
      },
    ])
    .then((input) => {
      console.log(input);
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        input.department,
        (err, result) => {
          if (err) throw err;
          mainMenu();
        }
      );
    });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
};

const addRole = () => {
  db.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    const options = data.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is your title",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the role's salary?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department is the role classified under?",
          choices: options,
        },
      ])
      .then((input) => {
        console.log(input);
        const sql =
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
        const values = [input.title, input.salary, input.department_id];
        db.query(sql, values, (err, result) => {
          if (err) throw err;
          mainMenu();
        });
      });
  });
};

mainMenu();
