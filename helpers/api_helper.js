const fetch = require("node-fetch");
const yaml = require("js-yaml");
const fs = require("fs");
const Forecast = require("../lib/pojos/forecast");

const fetchCoords = async (location) => {
        const key = await yaml.safeLoad(
          fs.readFileSync("./config.yml", "utf8")
        )["google_geocoding_api"];

        try {
          let response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
          );
          let geocodingData = await response.json();
          let latLong = await geocodingData["results"][0]["geometry"][
            "location"
          ];

          return latLong;
        } catch (err) {
          return err;
        }
      };

const fetchForecastData = async (location) => {
        const key = await yaml.safeLoad(
          fs.readFileSync("./config.yml", "utf8")
        )["dark_sky_api"];

        var lat = await fetchCoords(location).then(resp => resp["lat"]);
        var lng = await fetchCoords(location).then(resp => resp["lng"]);

        try {
          let response = await fetch(
            `https://api.darksky.net/forecast/${key}/${lat},${lng}`
          );
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
