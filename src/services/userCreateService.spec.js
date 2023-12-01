
const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null; // como essa linha e a anterior são comuns aos testes, posso colocá-las aqui para usar nos dois testes. Reaproveitamento de código

    beforeEach(() => { // função do jest que vai ser executada para cada teste, ANTES de cada um deles ser executado
      userRepositoryInMemory = new UserRepositoryInMemory();
      userCreateService = new UserCreateService(userRepositoryInMemory);
    });

  it ("user should be create", async () => { // it recebe 2 parâmetros: 1=descrição do teste,com a expectativa de resultado; 2=função que vai executar de fato  o teste
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }; // exemplo de dados eviados de uma requisição pelo usuário
  
    const userCreated = await userCreateService.execute(user);
    console.log(userCreated);
    expect(userCreated).toHaveProperty("id");
  }); 

  it("user should not be created with an existing email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com", // emails iguais
      password: "123"
    };

    const user2 = {
      name: "User Test 2",
      email: "user@test.com", // emails iguais
      password: "456"
    }; 

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso.")); // já espera que esse segundo usuário seja rejeitado e que seja igual ao new AppError com aquela mesma(idêntica) mensagem de erro
  });
});