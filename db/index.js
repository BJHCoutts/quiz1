const knexfile = require("../knexfile.js");

// The knex package exports a function. Call this function
// with the configuration for you db. We normally store
// this configuration inside of the knexfile.js
const knex = require("knex")(knexfile["development"]);

module.exports = knex;
