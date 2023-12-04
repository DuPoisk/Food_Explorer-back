const knex= require("../database/knex/index");
const AppError = require("../utils/AppError");

class DishController {

  async create(request,response){
    const {category, title, description, price}= request.body;//ingredients

    const doesDishAlreadyExist = await knex("dishes").where({title:title}); // busca na tabela dishes e compara o title
    if(doesDishAlreadyExist) {
      throw new AppError("Este prato já existe!");
    }

    const newDish = await knex("dishes").insert({ 
      category,
      title,
      description,
      price
    });

    const ingredient= ingredients.map(item => {
      return {
          name:item,
          dish_id: newDish[0]
      }
    })

    await knex('Ingredients').insert(ingredient)
    return response.status(201).json()
  }
  

  async index(request, response) { // para busca na barra de pesquisa
    const { title, ingredients } = request.query;
    let dishes;

    if(ingredients){
      const filteredIngredients = ingredients.split(",").map(item => item.trim());
      dishes = await knex("ingredients").select([
        "dishes.id",
        "dishes.category",
        "dishes.image",
        "dishes.title",
        "dishes.description",
        "dishes.price",
      ]).whereLike("dishes.title", `%${title}%`)
      .whereIn("name", filteredIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.title")
    } else {
      dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const Ingredients = await knex("ingredients");
    const dishInfo = dishes.map(dish => {
      const dishIngredient = Ingredients.filter(item => item.dish_id === dish.id);
        
      return {
        dish,
        ingredients: dishIngredient
      }
    }) 
    return response.json(dishInfo);
  }

  async update(request,response){
    const {category, title, description, price}= request.body;
  }

  async delete(request,response){
    const{id}= request.params;
    await knex('Dishes').where({id:id}).del();
    await knex('Ingredients').where({dish_id:id}).del(); // (precido verificar se ja nao esta no cascade)
  }
}

module.exports = DishController;