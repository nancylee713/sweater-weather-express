var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const helper = require("../../../helpers/api_helper");
const formatData = helper.formatData;

router.get('/', (request, response) => {
  var api_key = request.body.api_key;
  var location = request.query.location;

  if (api_key === undefined) {
    response.send(401, "Unauthorized: missing API key");
  }

  database("users").where('apiKey', api_key).then(user => {
    if (user.length) {
      formatData(location)
        .then(result => response.send(result))
        .catch(err => {
          return err;
        });
    } else {
      response.send(401, "Unauthorized: incorrect API key");
    }
  })
});

module.exports = router;