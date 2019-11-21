
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('email');
      table.string('password');
      table.string('apiKey');
      table.string('favoriteLocation');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
