// module and other imports
const inquirer = require("inquirer");
var db = require("./db/index");

// menu variable
var menu = [{
    type: "list",
    name: "menuChoice",
    message: "What would you like to do?",
    choices: [
        " View all employees",
        " View all employees by department",
        " Add employee",
        " Remove employee",
        " Update employee role",
        " Update employee manager",
        " View all roles",
        " Add role",
        " Remove role",
        " View all departments",
        " Add department",
        " Remove department",
        " View department budget",
        " Exit"
    ]
}, {
    type: "input",
    message: "Enter department name: ",
    name: "deptName",
    when: ({menuChoice}) => menuChoice === "Add department"
}]

console.log("Welcome to the employee tracker app!");
mainMenu();

// start app 
function mainMenu() {

    inquirer.prompt(menu).then(function (res) {

        switch (res.menuChoice) {

            case " View all employees":
                displayEmployees();
                break;

            case " View all employees by department":
                viewEmployeeDept();
                break;

            case " Add employee":
                addEmployee();
                break;

            case " Remove employee":
                removeEmployee();
                break;

            case " Update employee role":
                updateRole();
                break;

            case " Update employee manager":
                updateManager();
                break;

            case " View all roles":
                viewRoles();
                break;

            case " Add role":
                addRoles();
                break;

            case " Remove role":
                removeRoles();
                break;

            case " View all departments":
                viewDept();
                break;

            case " Add department":
                addDept();
                break;

            case " Remove department":
                removeDept();
                break;

            case " View department budget":
                viewBudget();
                break;

            case " Exit":
                db.endConnection();
                break;
        }
    })
};

// add employees
function addEmployee () {
    db.employee.getEmployees(managers => {
        db.role.getRoles(roles => {
            promptSelect(roles).then( (role_id) => {
                promptInfo(role_id, managers);
            });
        });
    });
};

// remove employees
function removeEmployee () {
    db.employee.getEmployees(employees => {
        promptSelect(employees).then( (employee_id) => {
            db.employee.removeEmployee(employee_id, employee => {
                mainMenu();
            });
        });
    });
};

// view department employees
function viewEmployeeDept () {
    db.department.getDepartments(departments => {
        promptDept(departments).then( (dept_id) {
            db.employee.getEmployeeDept(dept_id, employees => {
                employees = employees.reduce((acc, { id, ...x }) => {acc[id] = x; return acc}, {});
                console.table(employees);
                mainMenu();
            })
        })
    })
};

// prompt for employee info
function promptInfo () {
    console.log("Enter new employee info");
    let managerNames = managers.map(m => {
        return (m.first_name + " " + m.last_name);
    });
    managerNames.push("No Manager");
    inquirer.prompt([
        {
            type: "input",
            message: "Enter first name: ",
            name: "firstName"
        }
        {
            type: "input",
            message: "Enter last name: ",
            name: "lastName"
        }
        {
            type: "list",
            message: "Select manager: ",
            name: "manager",
            choices: "managerNames"
        }
    ]).then( (res) => {
        var manager_id;
        managers.forEach(m => {
            if ((m.first_name + " " + m.last_name) === res.manager) {
                manager_id = m.id;
            }
        });
        db.employee.addEmployee([
            res.first_name,
            res.last_name,
            role_id,
            manager_id
        ], employee => {
            mainMenu();
        });
    });
};

// prompt for select employee
function promptSelect (employees) {
    return new Promise( (resolve, reject) {
        if (!employees) return reject(Error("No employees found"));
        let names = employees.map(e => {
            return (e.first_name + " " + e.last_name);
        });
        inquirer.prompt({
            type: "list",
            name: "employeeName",
            message: "Select an employee",
            choices: names
        }).then( (res) => {
            employees.forEach(e => {
                if((e.first_name + " " + e.last_name) === res.employeeName) {
                    resolve(e.id);
                }
            });
        });
    });
};

// add roles
function addRoles () {
    db.department.getDepartments(departments => {
        promptSelectDepartment(departments).then( (department_id) => {
            promptRoleInfo(department_id);
        })
    });
};

// remove roles
function removeRoles () {
    db.role.getRoles(roles => {
        promptSelectRole(roles).then(function (role_id) {
            db.Role.removeRole(role_id, role => {
                mainMenu();
            })
        });
    });
};

// prompt for employee roles
function promptRoles () {
    console.log("Enter new role information");
    inquirer.prompt([
        {
            type: "input",
            message: "Enter role title: ",
            name: "title"
        },
        {
            type: "input",
            message: "Enter role salary: ",
            name: "salary"
        }
    ]).then( (res) => {
        db.Role.addRole([
            res.title,
            res.salary,
            departmentid
        ], role => {
            mainMenu();
        });
    });
};

// prompt for selecting employee roles
function promptSelectRole () {
    console.log("Select employee role");
    return new Promise( (resolve, reject) => {
        if (!roles) return reject(Error("No roles found!"));
        let roleTitles = roles.map(r => {
            return (r.title);
        });
        inquirer.prompt({
            type: "list",
            name: "role",
            message: "Choose a role",
            choices: roleTitles
        }).then( (res) => {
            roles.forEach(r => {
                if (r.title === res.role) {
                    resolve(r.id);
                }
            });
        });
    });
};

// add department
function addDept () {
    db.department.addDept([
        deptName
    ], department => {
        mainMenu();
    })
};

// remove departments
function removeDept () {
    db.department.getDepartments(departments => {
        promptSelectDepartment(departments).then( (department_id) => {
            db.department.removeDepartment(department_id, department => {
                mainMenu();
            })
        });
    });
};

// view department budget
function viewBudget () {
    db.department.getDepartments(departments => {
        promptSelectDepartment(departments).then( (department_id) => {
            db.Department.getDepartmentBudget(department_id, departments => {
                console.log("Department Budget: $");
                console.table(departments[0]);
                mainMenu();
            })
        });
    });
};

// prompt for selecting department
function promptDept () {
    console.log("Select department");
    return new Promise(function (resolve, reject) {
        if (!departments) return reject(Error("No departments"));
        let deptNames = departments.map(d => {
            return (d.name);
        });
        inquirer.prompt({
            type: "list",
            name: "department",
            message: "Choose department",
            choices: deptNames
        }).then(function (res) {
            departments.forEach(d => {
                if (d.name === res.department) {
                    resolve(d.id);
                }
            })
        });
    });
};

// display functions
// display employees
function displayEmployees () {
    
};

// display roles
function displayRoles () {
    
};

// display departments
function displayDept () {
    
};
