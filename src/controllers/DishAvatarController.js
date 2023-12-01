const knex = require("../database/knex"); // query builder - gera código sql para o banco de dados, manipulando a base de dados
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");


class DishAvatarController {
  
  async update(request,response){
    const {id} = request.params;
    const avatarFilename = request.file.filename; // nome do arquivo que o usuário fez o upload
    const diskStorage= new DiskStorage()

    const Dish =  await knex('Dishes').where({id:id}).first(); // faça busca por Dishes onde o id do prato seja igual o id que veio do params acima


      if(!Dish){ //verificar se o prato não existe
        throw new AppError("Esse prato não foi encontrado.", 401);
      }

      if(Dish.avatar){
        await diskStorage.deleteFile(Dish.avatar); // deletando a foto antiga do prato, se ela existir
      }

      const filename = await diskStorage.saveFile(avatarFilename); // pegando a nova foto e salvando o novo avatar
      user.avatar = filename;// colocando a nova imagem dentro do avatar

      await knex("Dishes").update(Dish).where({id:id}); // {id:  user_id} significa que estará atualizando os dados de um usuário específico, e não todos os usuários do banco de dados. No caso, a notação foi {id:id}
      return response.json(Dish); // retornando o  prato com a imagem atualizada
    
  }
}

module.exports = DishAvatarController;