var express = require("express");
var router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

var Favorite = require("../../../lib/pojos/favorite")

const findUser = async (key) => {
  let users = await database("users").where({ apiKey: key });
  return users[0].id;
}

const findCities = async key => {
  let uid = await findUser(key);
  let cities = await database("favorites")
    .where("user_id", uid);
  return cities;
};

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
            .status(200)
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

router.get('/', (request, response) => {
  var api_key = request.body.api_key;

  if (api_key === undefined) {
    response.send(
      401,
      "Unauthorized: missing API key"
    );
  }

  findCities(api_key)
    .then(cities => {
      var cities = cities.map(obj => obj.city );
      var result = cities.map(city => new Favorite(city));
      return response.status(200).send(result);
    })
    .catch(error => {
      return response.status(500).send(error);
    });
  });


module.exports = router;