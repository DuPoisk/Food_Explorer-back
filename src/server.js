require("dotenv/config");
//require("express-async-errors");
const express = require("express"); //st08.2.4
const migrationsRun = require("./database/sqlite/migrations");
const database = require("./database/sqlite");

const AppError = require("./utils/AppError");
const routes = require("./routes") /* quando não especifico a rota, ele puxa automaticamente o index, ou seja, é a mesma coisa que require("./routes/index.js")*/
const uploadConfig = require("./configs/upload");
const cors = require("cors");



const app = express(); //st08.2.4 para inicializar

//middlewares e configurações
app.use(cors()); //st10.3.2
app.use(express.json()); // (st08.2.13-Body_Params) diz qual o formato que quero que mostre o resultado da minha requisção
app.use(routes); /* AS ROTAS ESTÃO AQUI!*/
migrationsRun();
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); //static é para servir aquivos estáticos. No caso, essa linha refere-se à imagem do avatar

database();

app.use((err, request, response, next) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }

  console.error(err)
})



//inicializando o servidor
const PORT = process.env.SERVER_PORT || '3333'; // endereço
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // fique escutando na porta PORT e quando ela iniciar, vai soltar uma msg dizendo qual é essa porta
