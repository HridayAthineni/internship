// const dotenv = require('dotenv').config();
const knex = require('knex')({
    client: 'pg',
    connection: {
      host     : "127.0.0.1",
      user     : "postgres",
      password : "hriday329",
      database : 'bookshelf-DB',
      charset  : 'utf8'
    }
  });
  
  module.exports.knex = knex;
