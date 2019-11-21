const database = require("../../config");

class User {
  constructor(obj) {
    this.email = obj.email,
    this.password = obj.password,
    this.apiKey = obj.apiKey,
    this.favoriteLocation = obj.favoriteLocation;
  }

  static find(key) {
    return database("users").where({ apiKey: key });
  }
}

module.exports = User;
