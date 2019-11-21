exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(() => {
      return Promise.all([
        knex('users').insert({
          email: 'test@email.com', password: 'password', apiKey: 'jgn983hy48thw9begh98h4539h4'
        }, 'id')
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
