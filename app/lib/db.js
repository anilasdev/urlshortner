var objection = require('objection'),
    Model = objection.Model

let knexfile = require('../../knexfile')[process.env.NODE_ENV || 'development'],
    knex = require('knex')(knexfile)
Model.knex(knex)

module.exports = Model