const orm = require("orm");
// Load configs
require("../load-env");
const MYSQL_URI = process.env.MYSQL_URI;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PWD = process.env.MYSQL_PWD || "";
const MYSQL_DB = process.env.MYSQL_DB;

// Define all the tables to be created in the database
const defineModels = db => {
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
};
const insertValues = db => {
  const Point = db.models.points;
  return Point.createAsync([
    {
      id: 1,
      points: 10
    },
    {
      id: 2,
      points: 5
    },
    {
      id: 3,
      points: 2
    },
    {
      id: -1,
      points: 1
    }
  ]);
};

orm
  .connectAsync(`mysql://${MYSQL_USER}:${MYSQL_PWD}@${MYSQL_URI}/${MYSQL_DB}`)
  .then(db => {
    defineModels(db);
    db.sync(err => {
      if (err) {
        console.log(`Unable to sync db ${err}`);
        db.close();
      }
      // Insert necessary records in the tables
      insertValues(db)
        .then(() => {
          console.log("Voila! your database is in sync!");
          db.close();
        })
        .catch(err => {
          console.log(`Unable to insert values into the tables ${err}`);
          db.close();
        });
    });
  })
  .catch(err => {
    console.log(
      `Unable to connect to mysql database ${MYSQL_URI}/${MYSQL_DB}: ${err}`
    );
  });
