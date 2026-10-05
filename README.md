# QA Automation — Previsão do Tempo

![Cypress Tests](https://github.com/jmmedeiross/qa-automation-previsao-do-tempo/actions/workflows/cypress-tests.yml/badge.svg)

Projeto de portfólio com Cypress para testes da interface de previsão do tempo e de uma API REST.

## Cobertura

- Interface: busca de cidades, temperatura, descrição, umidade, entradas vazias, cidade inexistente e falhas de rede.
- API: consulta, criação, atualização e exclusão de usuários, status HTTP e tipos dos campos.

Os testes da interface usam `cy.intercept()` e fixtures, sem depender de um serviço real de clima. Os testes de API consultam o ReqRes e exigem uma credencial válida.

## Tecnologias

JavaScript, Cypress, HTML, CSS, http-server e GitHub Actions.

## Organização

```text
app/                         Aplicação sob teste
cypress/e2e/                 Testes da interface e da API
cypress/fixtures/            Respostas locais da API de clima
cypress/support/             Comandos e configuração compartilhada
cypress.config.js            Configuração dos testes da interface
cypress.api.config.js        Configuração dos testes de API
.github/workflows/           Execução automática
```

## Como executar

```bash
npm ci
npm test
```

Para abrir o Cypress, inicie a aplicação:

```bash
npm run serve
```

Em outro terminal:

```bash
npm run cy:open
```

Para executar somente a API, configure a chave no PowerShell:

```powershell
$env:CYPRESS_REQRES_API_KEY="SUA_API_KEY"
npx cypress run --config-file cypress.api.config.js --spec "cypress/e2e/api-usuarios.cy.js"
```

## Integração contínua

O workflow executa os testes de interface e de API em jobs separados a cada push ou pull request para `main`. A credencial da API vem do Secret `REQRES_API_KEY`.

Consulte os [resultados reais das execuções](https://github.com/jmmedeiross/qa-automation-previsao-do-tempo/actions). A existência dos testes não significa que a última execução passou; o badge indica o estado do workflow.

## Próximas evoluções

Testes de acessibilidade, responsividade e relatórios com evidências de execução.

## Autor

[João Medeiros](https://github.com/jmmedeiross)
