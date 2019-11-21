var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const fetch = require('node-fetch');
const yaml = require("js-yaml");
const fs = require("fs");

const Forecast = require('../../../lib/pojos/forecast');


router.get('/', (request, response) => {
  var api_key = request.body.api_key;
  var location = request.query.location;

  if (api_key === undefined) {
    response.send(401, "Unauthorized: missing API key");
  }

  database("users").where('apiKey', api_key).then(user => {
    if (user.length) {
      fetchCoords = async () => {
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
          console.log(err);
        }
      };

      fetchForecastData = async () => {
        const key = await yaml.safeLoad(
          fs.readFileSync("./config.yml", "utf8")
        )["dark_sky_api"];

        var lat = await fetchCoords().then(resp => resp["lat"]);
        var lng = await fetchCoords().then(resp => resp["lng"]);

        try {
          let response = await fetch(
            `https://api.darksky.net/forecast/${key}/${lat},${lng}`
          );
          let forecast = await response.json();
          return forecast;
        } catch (err) {
          console.log(err);
        }
      };

      (formatData = async () => {
        let rawData = await fetchForecastData()
          .then(resp => new Forecast(location, resp))
          .then(result => response.send(result))
          .catch(err => console.log(err));
      })();
    } else {
      response.send(401, "Unauthorized: incorrect API key");
  }
  })
});

module.exports = router;