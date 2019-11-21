var express = require("express");
var router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

const findUser = (key) => {
  var uid = database('users').where('apiKey', key).select('id')
  return uid;
}

router.post('/', (request, response) => {
  var location = request.body.location;
  var api_key = request.body.api_key;

  if (api_key === undefined) {
    response.send(
      401,
      "Unauthorized: missing API key"
    );
  }

  if (!location) {
    return response.status(422).send({
      error: `Expected format: { location: <String> }. You're missing a location property.`
    });
  }
  

  database("users").where("apiKey", api_key).then(user => {
    if (user.length && typeof(location) === 'string') {
      database("favorites")
        .insert({ city: location, user_id: user[0].id }, "id")
        .then(res => {
          response
            .status(201)
            .send({ message: `${location} has been added to your favorites` });
        })
    } else if (typeof location !== "string") {
             response.send(422, "Location should be a string");
           } else {
             response.send(401, "Unauthorized: incorrect API key");
           }
    }).catch(error => {
      { error }
    });
});

module.exports = router;