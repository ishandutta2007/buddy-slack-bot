const db = require("./db");

const defineModels = db => {
  const { People, Point } = require("./schema");
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
