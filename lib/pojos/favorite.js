const helper = require("../../helpers/api_helper");
const fetchForecastData = helper.fetchForecastData;
const Hourly = require("../pojos/hourly");

const getForecast = async (location) => {
    let rawData = await fetchForecastData(location);
    return new Hourly(rawData.hourly.data[0]);
};

const getSummary = async (location) => {
  let rawData = await getForecast(location);
  var result = {};
  for (var prop in rawData) {
    result[prop] = rawData[prop];
  }
  return result;
}

class Favorite {
  constructor(obj) {
    (this.location = obj),
    (this.current_weather = getSummary(obj));
      
  }
}

module.exports = Favorite;
