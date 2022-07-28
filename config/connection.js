// modules and other imports
var mysql = require("mysql");
require('dotenv').config();

// create connection to sql
let connection = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

module.exports = connection;