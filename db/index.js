// all imports
const connection = require("../config/connection");
const employee = require("./employee");
const role = require("./role");
const department = require("./department");

// database class
class db {

    constructor(connection) {
        this.connection = connection;
        this.employee = employee;
        this.role = role;
        this.department = department;
    }

    endConnection() {
        this.connection.end();
    }
};

module.exports = new db(connection);