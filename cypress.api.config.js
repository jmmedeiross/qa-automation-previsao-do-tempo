const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/api-usuarios.cy.js",
    supportFile: false,
  },
});