const fetch = require("node-fetch");
const yaml = require("js-yaml");
const fs = require("fs");
const Forecast = require("../lib/pojos/forecast");

const getKey = (api) => {
  return yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"))[api];
}

const fetchCoords = async (location) => {
        const key = await getKey('google_geocoding_api');
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`;
        
        try {
          let response = await fetch(url);
          let geocodingData = await response.json();
          let latLong = await geocodingData["results"][0]["geometry"]["location"];
          return latLong;
        } catch (err) {
          return err;
        }
      };

const fetchForecastData = async (location) => {
        const key = await getKey("dark_sky_api");
        var lat = await fetchCoords(location).then(resp => resp["lat"]);
        var lng = await fetchCoords(location).then(resp => resp["lng"]);
        const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}?exclude=currently,minutely,flags`;

        try {
          let response = await fetch(url);
          let forecast = await response.json();
          return forecast;
        } catch (err) {
          return err;
        }
      };

const formatData = async (location) => {
        let rawData = await fetchForecastData(location);
        let formattedData = await new Forecast(location, rawData);
        return formattedData;
      };

module.exports = {
  fetchCoords,
  fetchForecastData,
  formatData
};
