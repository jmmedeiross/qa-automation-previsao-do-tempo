const BASE_URL = "https://reqres.in/api";

const apiRequest = (options = {}) => {
  return cy.request({
    ...options,
    headers: {
      "x-api-key": Cypress.env("REQRES_API_KEY"),
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
};

describe("API de Usuários - GET /users", () => {
  it("retorna status 200 e uma lista de usuários paginada", () => {
    apiRequest({
      method: "GET",
      url: `${BASE_URL}/users?page=1`,
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.have.property("data").and.to.be.an("array");
      expect(resposta.body.data.length).to.be.greaterThan(0);
      expect(resposta.body).to.have.property("page", 1);
    });
  });

  it("cada usuário retornado possui os campos obrigatórios com os tipos corretos", () => {
    apiRequest({
      method: "GET",
      url: `${BASE_URL}/users?page=1`,
    }).then((resposta) => {
      resposta.body.data.forEach((usuario) => {
        expect(usuario).to.have.property("id").and.to.be.a("number");
        expect(usuario).to.have.property("email").and.to.be.a("string");
        expect(usuario).to.have.property("first_name").and.to.be.a("string");
        expect(usuario).to.have.property("last_name").and.to.be.a("string");

        expect(usuario.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });
  });

  it("retorna um usuário específico existente pelo ID", () => {
    apiRequest({
      method: "GET",
      url: `${BASE_URL}/users/2`,
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      expect(resposta.body.data).to.have.property("id", 2);
    });
  });

  it("retorna 404 ao buscar um usuário que não existe", () => {
    apiRequest({
      method: "GET",
      url: `${BASE_URL}/users/999`,
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(resposta.status).to.eq(404);
    });
  });
});

describe("API de Usuários - POST /users (criação)", () => {
  it("cria um novo usuário com dados válidos e retorna 201", () => {
    const novoUsuario = {
      name: "João Medeiros",
      job: "QA Automation",
    };

    apiRequest({
      method: "POST",
      url: `${BASE_URL}/users`,
      body: novoUsuario,
    }).then((resposta) => {
      expect(resposta.status).to.eq(201);
      expect(resposta.body).to.have.property("name", novoUsuario.name);
      expect(resposta.body).to.have.property("job", novoUsuario.job);
      expect(resposta.body).to.have.property("id");
      expect(resposta.body).to.have.property("createdAt");
    });
  });
});

describe("API de Usuários - PUT /users/:id (atualização)", () => {
  it("atualiza um usuário existente e retorna os novos dados", () => {
    const dadosAtualizados = {
      name: "João Medeiros",
      job: "QA",
    };

    apiRequest({
      method: "PUT",
      url: `${BASE_URL}/users/2`,
      body: dadosAtualizados,
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.have.property("name", "João Medeiros");
      expect(resposta.body).to.have.property("job", "QA");
      expect(resposta.body).to.have.property("updatedAt");
    });
  });
});

describe("API de Usuários - DELETE /users/:id", () => {
  it("remove um usuário existente e retorna 204", () => {
    apiRequest({
      method: "DELETE",
      url: `${BASE_URL}/users/2`,
    }).then((resposta) => {
      expect(resposta.status).to.eq(204);
    });
  });
});