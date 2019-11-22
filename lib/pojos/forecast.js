var Hourly = require("../pojos/hourly");
var Daily = require("../pojos/daily");

class Forecast {
  constructor(location, obj) {
    (this.location = location),
      (this.currently = obj.currently),
      (this.hourly = obj.hourly.data.slice(0,9).map(raw => new Hourly(raw))),
      (this.daily = obj.daily.data.slice(0,9).map(raw => new Daily(raw)));
  }
}

module.exports = Forecast;
