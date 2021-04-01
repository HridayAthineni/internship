const knex = require('../db').knex;
const bookshelf = require('bookshelf')(knex);

const Student = bookshelf.Model.extend({  
    tableName: 'students'
});

module.exports = Student;