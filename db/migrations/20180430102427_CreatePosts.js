// This method, "up", should return a knex.schema
// query. It's run when "knex migrate:latest"
exports.up = knex => {
  return knex.schema.createTable("posts", table => {
    table.increments("id");
    // Creates a column that uses the SERIAL type
    // in postgres
    table.string("username");
    // Creates column of data-type VARCHAR(255) with
    // name "username"
    table.text("description");
    table.string("pictureUrl");
    table.timestamp("createAt").default(knex.fn.now());
    // Creates a column named "createdAt" of type
    // timestamp where its default is set to
    // the date at the time the row is created.
  });
};

// This method, "down", should return a knex.schema
// query. It's meant reverse the work done in "up".
// It's run with the command "knex migrate:rollback"
exports.down = knex => {
  return knex.schema.dropTable("posts");
};
