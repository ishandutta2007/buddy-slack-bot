class People {
  constructor() {
    this.model = require("../db/schema").People;
  }

  upsert(id, displayName) {
    this.model.findAsync({ id }).then(users => {
      if (users.length > 0) {
        users[0].displayName = displayName;
        return users[0].saveAsync();
      } else {
        return this.model.createAsync({
          id,
          displayName
        });
      }
    });
  }
}

module.exports = People;
