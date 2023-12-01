const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

async function ensureAdminAuthenticated(request, response, next) {
  //buscar somente por admins
  let{Admin} = request.body; 
  const currentAdmin = await knex("Users").where({Admin:1}); // procurar na tabela onde admin = 1, ou seja, em qual usuário o isAdmin é verdadeiro
  




  if (!currentAdmin) {   ///se não for Admin... 
    throw new AppError("Usuário não autorizado", 401); // o usuário tem um jwt, porém inválido. "JWT Token inválido"
  }   
    
  return next();
}

module.exports = ensureAdminAuthenticated;