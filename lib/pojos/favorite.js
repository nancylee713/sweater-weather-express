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

const getFavSummary = async (location) => {
  let data = {
    location: await location,
    current_weather: await getSummary(location).then(res => res)
  };
  return data;
}

module.exports = { getFavSummary };
