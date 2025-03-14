const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "linkdb",
    password: "admin",
    port: 5432
});