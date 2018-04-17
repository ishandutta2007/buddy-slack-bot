const db = require("./db");

// Define all the tables to be created in the database

// People table to hold all the users in the team
const People = db.define("people", {
  id: { type: "text", key: true },
  displayName: String
});
// Points table to hold different points for 1st, 2nd, 3rd ... entries
const Point = db.define("points", {
  id: { type: "integer", key: true },
  points: Number
});

module.exports = { People, Point };
