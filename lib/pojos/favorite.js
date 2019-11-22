const helper = require("../../helpers/api_helper");
const fetchForecastData = helper.fetchForecastData;
const Hourly = require("../pojos/hourly");

const getForecast = (location) => {
    fetchForecastData(location).then(res => {
      return new Hourly(res.hourly.data[0]);
    });
  };

class Favorite {
  constructor(obj) {
    (this.location = obj), (this.current_weather = getForecast(obj));
  }
}

module.exports = Favorite;
