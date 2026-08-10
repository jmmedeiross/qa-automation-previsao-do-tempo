// Comando customizado para buscar uma cidade na tela de previsão do tempo.
// Centraliza a interação repetida (digitar + clicar) para deixar os
// testes mais legíveis e fáceis de manter.

Cypress.Commands.add("buscarCidade", (nomeCidade) => {
  cy.get(".input-cidade").clear().type(nomeCidade);
  cy.get(".botao-busca").click();
});
