describe("Previsão do Tempo - Busca por cidade", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("exibe o estado inicial da tela corretamente", () => {
    cy.get(".temp-cidade").should("contain.text", "Tempo em São Paulo");
    cy.get(".temp").should("be.visible");
    cy.get(".input-cidade").should("have.attr", "placeholder", "Digite o nome da cidade");
    cy.get(".mensagem-erro").should("not.be.visible");
  });

  it("atualiza a tela com os dados corretos ao buscar uma cidade válida", () => {
    cy.intercept("GET", "**/data/2.5/weather*", {
      fixture: "previsao-sucesso.json",
    }).as("buscaPrevisao");

    cy.buscarCidade("São Paulo");
    cy.wait("@buscaPrevisao");

    cy.get(".temp-cidade").should("contain.text", "Tempo em São Paulo");
    cy.get(".temp").should("contain.text", "24°C");
    cy.get(".texto-previsao").should("contain.text", "Céu limpo");
    cy.get(".umidade").should("contain.text", "Umidade: 68%");
    cy.get(".mensagem-erro").should("not.be.visible");
  });

  it("envia a cidade digitada corretamente na chamada de API", () => {
    cy.intercept("GET", "**/data/2.5/weather*", {
      fixture: "previsao-salvador.json",
    }).as("buscaPrevisao");

    cy.buscarCidade("Salvador");

    cy.wait("@buscaPrevisao").its("request.url").should("include", "q=Salvador");
    cy.get(".temp-cidade").should("contain.text", "Tempo em Salvador");
  });

  it("permite buscar mais de uma cidade em sequência, atualizando os dados", () => {
    cy.intercept("GET", "**/data/2.5/weather*", (req) => {
      if (req.url.includes("Salvador")) {
        req.reply({ fixture: "previsao-salvador.json" });
      } else {
        req.reply({ fixture: "previsao-sucesso.json" });
      }
    }).as("buscaPrevisao");

    cy.buscarCidade("São Paulo");
    cy.wait("@buscaPrevisao");
    cy.get(".temp").should("contain.text", "24°C");

    cy.buscarCidade("Salvador");
    cy.wait("@buscaPrevisao");
    cy.get(".temp").should("contain.text", "29°C");
    cy.get(".texto-previsao").should("contain.text", "Nublado");
  });

  it("exibe mensagem de erro quando a cidade não é encontrada", () => {
    cy.intercept("GET", "**/data/2.5/weather*", {
      statusCode: 404,
      body: { cod: "404", message: "city not found" },
    }).as("buscaPrevisaoErro");

    cy.buscarCidade("CidadeQueNaoExiste123");
    cy.wait("@buscaPrevisaoErro");

    cy.get(".mensagem-erro")
      .should("be.visible")
      .and("contain.text", "Cidade não encontrada");
  });

  it("exibe mensagem de erro quando a API está indisponível", () => {
    cy.intercept("GET", "**/data/2.5/weather*", {
      forceNetworkError: true,
    }).as("buscaPrevisaoOffline");

    cy.buscarCidade("São Paulo");

    cy.get(".mensagem-erro")
      .should("be.visible")
      .and("contain.text", "Não foi possível buscar a previsão");
  });

  it("não faz a busca quando o campo de cidade está vazio", () => {
    cy.intercept("GET", "**/data/2.5/weather*").as("buscaPrevisao");

    cy.get(".botao-busca").click();

    cy.get(".mensagem-erro")
      .should("be.visible")
      .and("contain.text", "Digite o nome de uma cidade");
    cy.get("@buscaPrevisao.all").should("have.length", 0);
  });

  it("ignora espaços em branco no início/fim do nome da cidade", () => {
    cy.intercept("GET", "**/data/2.5/weather*", {
      fixture: "previsao-sucesso.json",
    }).as("buscaPrevisao");

    cy.buscarCidade("   São Paulo   ");
    cy.wait("@buscaPrevisao").its("request.url").should("include", "q=S%C3%A3o%20Paulo");
  });
});
