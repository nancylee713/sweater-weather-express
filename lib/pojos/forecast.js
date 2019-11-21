var Hourly = require("../pojos/hourly");
var Daily = require("../pojos/daily");

class Forecast {
  constructor(location, obj) {
    (this.location = location),
      (this.currently = obj.currently),
      (this.hourly = obj.hourly.data.map(raw => new Hourly(raw))),
      (this.daily = obj.daily.data.map(raw => new Daily(raw)));
  }
}

module.exports = Forecast;
