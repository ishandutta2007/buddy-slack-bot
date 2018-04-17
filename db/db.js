const orm = require("orm");
// Load configs
require("../load-env");
const MYSQL_URI = process.env.MYSQL_URI;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PWD = process.env.MYSQL_PWD || "";
const MYSQL_DB = process.env.MYSQL_DB;

const db = orm.connect(
  `mysql://${MYSQL_USER}:${MYSQL_PWD}@${MYSQL_URI}/${MYSQL_DB}`
);

module.exports = db;
