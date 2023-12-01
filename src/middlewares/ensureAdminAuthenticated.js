const AppError = require("../utils/AppError");
const knex= require("../database/knex");

async function ensureAdminAuthenticated(request, response, next) {
  //buscar usuários
  const user_id = request.user.id;
  const user = await knex("users").where({id: user_id }); 
  
  if (!user.isAdmin ) {   ///se não for Admin... 
    throw new AppError("Usuário não autorizado", 401); // o usuário tem um jwt, porém inválido. "JWT Token inválido"
  }     
  return next();
}

module.exports = ensureAdminAuthenticated;