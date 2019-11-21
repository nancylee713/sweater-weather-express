// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/express_sweater_weather_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/express_sweater_weather_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://nndxygudwbcppz:e6a08ad096eaf4ca6940d71a57f207808bf3f908ef8c0a0ff2bf4c9fa61b1e67@ec2-174-129-203-86.compute-1.amazonaws.com:5432/d323aqt23b2hv8',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
