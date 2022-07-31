// modules and other imports
var mysql = require("mysql");
require('dotenv').config();

// create connection to sql
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = connection;