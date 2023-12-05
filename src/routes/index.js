const { Router } = require('express');

const userRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const dishesRoutes = require("./dishes.routes"); 

const routes = Router();

routes.use("/users", userRoutes); /* toda vez que alguém for acessar o meu /user, vai ser redirecionado para o userRotuer, que é o grupo de rotas do usuário*/
routes.use("/sessions", sessionsRoutes); 
routes.use("/dishes", dishesRoutes); 

module.exports = routes