var express = require("express");
var router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

const fetch = require("node-fetch");
const yaml = require("js-yaml");
const fs = require("fs");

const User = require("../../../lib/models/users");

router.post('/', (request, response) => {
  var location = request.body.location;
  var api_key = request.body.api_key;

  database("users").where("apiKey", api_key).then(user => {
    return database("favorites").insert({ city: location }).then(res => {
      res.json({
        success: true,
        message: `${location} has been added to your favorites`
      }).catch(error => { error })
    });
  })
});