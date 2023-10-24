const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "Mercilia@22",
        database: "micel_bank"
    }
});

module.exports = knex;