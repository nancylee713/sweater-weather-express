var express = require('express');
var router = express.Router();
const database = require('../../../config');
const helper = require("../../../helpers/api_helper");
const formatData = helper.formatData;

const keyExists = (key, response) => {
  if (key === undefined) {
    response.send(401, "Unauthorized: missing API key");
  }
};

router.get('/', (request, response) => {
  var api_key = request.body.api_key;
  var location = request.query.location;

  keyExists(api_key, response);
  
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