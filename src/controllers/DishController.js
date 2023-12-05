const knex= require("../database/knex/index");
const AppError = require("../utils/AppError");

class DishController {

  async create(request, response) {
    const {category, title, description, ingredients, price}= request.body;

    const doesDishAlreadyExist = await knex("dishes").where({title:title}); // busca na tabela dishes e compara o title
    if(doesDishAlreadyExist) {
      throw new AppError("Este prato já existe!");
    }

    const newDish = await knex("dishes").insert({ category, title, description, price});

    const ingredientAdd= ingredients.map(ingredient => {
      return {
        dish_id: newDish[0],
        name: ingredient
      };
    });

    await knex("ingredients").insert(ingredientAdd);
    
    return response.status(201).json(newDish[0]);

  }

  async index(request, response) { 
    const { title, ingredients } = request.query;
    let dishes;

    if(ingredients){
      const filteredIngredients = ingredients.split(",").map(ingredient => ingredient.trim());
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
      .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    };

    const Ingredients = await knex("ingredients");
    const dishInfo = dishes.map(dish => {
      const dishIngredient = Ingredients.filter(ingredient => ingredient.dish_id === dish.id);        
      return {
        dish,
        ingredients: dishIngredient
      };
    });

    return response.json(dishInfo);
  }

  async show(request, response) {
    const { id } = request.params;
    const dishes = await knex("dishes").where({id: id});
    const ingredients= await knex("ingredients").where({dish_id: id}).orderBy("name");
    return response.json({ ...dishes, ingredients });
  }

  async update(request, response) {
    const {category, title, description, ingredients, price} = request.body;
    const { id }= request.params;
    let chosenDish = await knex("dishes").where({id: id});

    if (!chosenDish) { // prato não existe
      throw new AppError("Esse prato não foi encontrado!");
    }

    chosenDish.category = category ? category : chosenDish.category;
    chosenDish.title = title ? title : chosenDish.title;
    chosenDish.description = description ? description : chosenDish.description;
    chosenDish.price = price ? price : chosenDish.price;

    const updatedDish =  await knex("dishes").update(chosenDish).where({id: id});

    const ingredient= ingredients.map(ingredient => {
      return {
        dish_id: id,
        name:ingredient
      };
    });

    await knex("ingredients").where({dish_id: id}).delete();
    await knex("ingredients").insert(ingredient).where({dish_id: id});
    return response.status(200).json(updatedDish[0]);
  }

  async delete(request, response) {
    const{ id }= request.params;
    await knex("dishes").where({id:id}).delete();
    await knex("ingredients").where({dish_id: id}).delete(); // (preciso verificar se ja nao esta no cascade)
    return response.status(200).json();
  }
}

module.exports = DishController;