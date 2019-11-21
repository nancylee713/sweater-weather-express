# Express Sweater Weather project
This project is a JSON API built with Express framework and Node.js. The API exposes four endpoints, including retrieving detailed forecast for a given city, posting a favorite location, listing all favorite locations, and deleting an existing location. The project uses a [starter repo](https://github.com/turingschool-examples/all-your-base) from Turing School's Backend Module 4.


## Getting started
- Demo: [Sweater-Weather API](https://express-nice-sweater-weather.herokuapp.com/)
- Alternatively, [Postman](https://www.getpostman.com/downloads/) can be used to make HTTP requests. 
- All requests must contain a **JSON** api key within the **body** as follows:

```
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
``` 
#### 1. Retrieve forecast data for a city
- On Postman, `GET https://express-nice-sweater-weather.herokuapp.com/api/v1/forecast?denver,co`. 

A successful request would generate a response that looks something like this:

```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

#### 2. Add your favorite location
`POST https://express-nice-sweater-weather.herokuapp.com/api/v1/favorites`

```
body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

A successful request would generate a response that looks something like this:

```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```

#### 3. List favorite locations
`GET https://express-nice-sweater-weather.herokuapp.com/api/v1/favorites`. Again, don't forget to include the api key in the body as JSON format. 

A successful request would return an array of objects containing location name and information about the current weather, like so:

```
status: 200
body:
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```

#### 4. Delete an existing record from the list of favorite locations
`DELETE https://express-nice-sweater-weather.herokuapp.com/api/v1/favorites` with the following information in the body:

```
body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

### Try on your local machine
- Install required packages: run `npm install`
- Run migrations: `knex migrate:latest`, then `knex seed:run`
- Run server: `npm start`


### Versions
```
node v10.16.3
express 4.16.4
Knex CLI version: 0.20.1
Knex Local version: 0.19.5
```
