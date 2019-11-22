var express = require("express");
var router = express.Router();
const database = require('../../../config');
var Favorite = require("../../../lib/pojos/favorite")

const findUser = async (key) => {
  let users = await database("users").where({ apiKey: key });
  return users[0].id;
}

// const asyncForEach = async (arr, callback) => {
//   for (let i = 0; i < arr.length; i++) {
//     await callback(arr[i], i, arr);
//   }
// };

const findCities = async key => {
  let uid = await findUser(key);
  let cities = await database("favorites")
    .where("user_id", uid).map(obj => obj.city);
  return cities;
}

const mapCities = async (key) => {
  return await findCities(key).then(result => {
    return result.map(city => new Favorite(city));
  });
}

const keyExists = (key, response) => {
  if (key === undefined) {
    response.status(401).send({
      Unauthorized: "missing API key"
    });
  }
}

const locationExists = (location, response) => {
  if (!location) {
    response.status(422).send({
      error: `Expected format: { location: <String> }. You're missing a location property.`
    });
  }
};

router.post('/', (request, response) => {
  var location = request.body.location;
  var api_key = request.body.api_key;

  keyExists(api_key, response);
  locationExists(location, response);

  database("users").where("apiKey", api_key).then(user => {
    if (user.length && typeof(location) === 'string') {
      database("favorites")
        .where({user_id: user[0].id, city: location})
        .first()
        .then((found) => {
          if (found) {
            response.status(422).send(`${location} already present`);
          } else {
            database("favorites").insert({ city: location, user_id: user[0].id }, "id")
                    .then(res => {
                      response
                        .status(200)
                        .send({ message: `${location} has been added to your favorites` });
                    })
          }}
        )} else if (typeof location !== "string") {
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

  keyExists(api_key, response);

  mapCities(api_key).then(result => {
    response.status(200).json(result);
  });
      
  });

router.delete('/', (request, response) => {
  var location = request.body.location;
  var api_key = request.body.api_key;

  keyExists(api_key, response);
  locationExists(location, response);

  findUser(api_key).then(user => {
    return database("favorites").where('user_id', user).where('city', location).del();
  }).then(res => {
    return response.status(204).send();
  }).catch(error => {
    return response.status(500).send(error);
  });

});

module.exports = router;