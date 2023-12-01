const { Router } = require("express");
const userRoutes = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
//Verificar se a logica esta correta no middleware const ensureAdminAuthenticated = require("../middlewares/ensureAdminAuthenticated");

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController(); //a constante usersController é uma instância do UsersController


userRoutes.post("/", usersController.create);
userRoutes.put("/", ensureAuthenticated, usersController.update); // uso o put quando quero atualizar propriedades de um determinado registro, com mais de um campo no banco de dados


/* para eu expor as rotas. exporto para quem quiser usar o arquivo, poder usar*/
module.exports = userRoutes;
