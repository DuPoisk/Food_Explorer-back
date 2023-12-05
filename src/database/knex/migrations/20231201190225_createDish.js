exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.text("category");
  table.text("image"); // padronizar nome de image ou avatar !!!
  table.text("title").notNullable();
  table.text("description");
  table.text("ingredients");
  table.text("price");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
