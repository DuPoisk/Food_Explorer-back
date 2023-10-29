require("express-async-errors");
const express = require("express");
const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");
const routes = require("./routes") /* quando não especifico a rota, ele puxa automaticamente o index, ou seja, é a mesma coisa que require("./routes/index.js")*/
const uploadConfig = require("./configs/upload");
const cors = require("cors"); // ainda nao instalei


const app = express(); //st08
app.use(cors()); //st10
app.use(express.json()); // diz qual o formato que quero que mostre o resultado da minha requisção
app.use(routes); /* AS ROTAS ESTÃO AQUI!*/
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); //static é para servir aquivos estáticos. No caso, essa linha refere-se à imagem do avatar

const PORT = process.env.SERVER_PORT || '3333'; // endereço
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // fique escutando na porta PORT e quando ela iniciar, vai soltar uma msg dizendo qual é essa porta
