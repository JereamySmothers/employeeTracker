// departments class
class department {
    constructor(connection) {
        this.connection = connection;
    }

    getDepartments(cb) {
        this.connection.query(`
        SELECT * 
        FROM department
        `, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    };

    getBudget(id, cb) {
        this.connection.query(`
        SELECT SUM(role.salary)
        FROM employee
        INNER JOIN role on employee.role_id
        AND department_id=?
        `, id, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    };

    addDepartment(department, cb) {
        this.connection.query(`
        INSERT INTO department(name)
        VALUES (?)
        `, department, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    };

    removeDepartments(id, cb) {
        this.connection.query(`
        DELETE FROM department
        WHERE id=?
        `, id, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    };
}
module.exports = department;