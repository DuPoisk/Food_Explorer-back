exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.text("name").notNullable(); //text é o tipo texto / notNullable significa que não é para aceitar valores nulos
  table.text("email");
  table.text("password");
  table.boolean("isAdmin").default(false);
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");
