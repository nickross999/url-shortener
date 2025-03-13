const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "linkdb",
    password: "nick2096",
    port: 5432
});