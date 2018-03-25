const appRootPath = require("app-root-path");
// Load the configuration file
const NODE_ENV = process.env.NODE_ENV || "dev";

if (NODE_ENV == "dev") {
  const env = require("node-env-file");
  env(`${appRootPath}/.env`);
}
