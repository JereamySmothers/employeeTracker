const connection = require('../config/connection')
// employees class
class employee {

    constructor(connection) {
        this.connection = connection;
    }

    getEmployees(cb) {
        console.log("Gathering employees");
        this.connection.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title 
        AS role_title, manager.first_name AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
        `, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }

    addEmployee(employee, cb) {
        console.log("Adding employee");
        this.connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", employee, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }

    removeEmployee(id, cb) {
        console.log("Removing employee");
        this.connection.query("DELETE FROM employee WHERE id=?", id, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }

    updateEmployeeRole(employee_id, role_id, cb) {
        console.log("Updating employee role");
        this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_Id, employee_Id], (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }

    updateManager(employee_id, manager_id, cb) {
        console.log("Updating manager");
        this.connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [manager_id, employee_id], (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }
}
module.exports = new employee(connection);