const {Router} = require("express");
const DishController = require("../controllers/DishController");
const dishController = new DishController(); // uma vez DishController sendo uma classe, instacio-o: alocando a classe na memória e armazenando na const dishController
const dishesRoutes = Router();

const DishAvatarController = require("../controllers/DishAvatarController");
const dishAvatarController = new DishAvatarController();


const multer = require('multer');
const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER);

dishesRoutes.post("/", dishController.create); // acessando 
dishRoutes.get("/", dishController.index);
dishesRoutes.put("/:id",dishController.update);
dishesRoutes.patch('/:id', upload.single('avatar'),dishAvatarController.update);
dishesRoutes.get("/:id", dishController.show);
dishesRoutes.delete("/:id", dishController.delete); /* essa linha faz com que a rota de deletar seja visível*/

module.exports = dishesRoutes;

// falta a parte de autenticação Admin  e usuarios