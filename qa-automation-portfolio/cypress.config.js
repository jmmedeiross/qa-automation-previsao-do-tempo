const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5500/app",
    setupNodeEvents(on, config) {
      // implementar listeners de node aqui, se necessário
    },
  },
  viewportWidth: 400,
  viewportHeight: 700,
  video: false,
});
