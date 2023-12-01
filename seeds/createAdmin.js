const { hash } = require("bcryptjs");

exports.seed = async function(knex) {
  await knex("users").insert([
    {
      name: "admin",
      email: "admin@email.com",
      password: await hash("admin123", 8),
      isAdmin: true,
    },
    {
      name: "user01",
      email: "user01@email.com",
      password: await hash("user0123", 8),
      isAdmin: false,
    },
  ]);
};

// https://materialpublic.imd.ufrn.br/curso/disciplina/3/77/10/2