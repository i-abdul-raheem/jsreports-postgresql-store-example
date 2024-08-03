const jsreport = require("jsreport")();
const { Pool } = require("pg");

const connectionString = `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;
const pool = new Pool({ connectionString });
jsreport.use(
  require("@jsreport/jsreport-postgres-store")({
    connectionString,
  })
);

module.exports = {
    jsreport, pool
}