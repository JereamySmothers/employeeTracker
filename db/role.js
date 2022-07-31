// roles class
class role {
    constructor(connection) {
        this.connection = connection;
    }

    getRoles(cb) {
        this.connection.query(`
        SELECT title, salary, name 
        AS department_name
        FROM role 
        LEFT JOIN department 
        ON role.department_id = department.id
        `, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    };

    addRoles(role, cb) {
        this.connection.query(`
        INSERT INTO role(title, salary, department_id) 
        VALUES (?, ?, ?)
        `, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    };

    removeRoles(id, cb) {
        this.connection.query(`
        DELETE FROM role 
        WHERE id=? 
        `,id, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    };
}
module.exports = role;