# QA Automation - Previsão do Tempo

![Cypress Tests](https://github.com/jmmedeiross/qa-automation-previsao-do-tempo/actions/workflows/cypress-tests.yml/badge.svg)

Projeto de portfólio em **QA Automation** utilizando Cypress para demonstrar automação de testes E2E, testes de API, validação de respostas e execução automatizada com GitHub Actions.

## Sobre o projeto

O projeto utiliza uma aplicação de previsão do tempo como sistema sob teste.

A suíte automatizada cobre dois grupos de testes:

- **UI / E2E** - valida o comportamento da aplicação e seus principais fluxos.
- **API Testing** - valida uma API REST utilizando requisições GET, POST, PUT e DELETE.

Os testes de UI utilizam `cy.intercept()` e fixtures para simular respostas da API de clima, tornando os testes independentes da disponibilidade de serviços externos.

## O que é testado

### UI / E2E

- Estado inicial da aplicação
- Busca de cidade
- Exibição da temperatura
- Exibição da descrição do clima
- Exibição da umidade
- Validação da cidade enviada para a API
- Busca de diferentes cidades em sequência
- Cidade não encontrada
- Falha de rede
- Campo vazio
- Espaços em branco

### API

- GET /users
- Validação de status code
- Validação de schema
- Validação de tipos de dados
- Busca de usuário por ID
- Usuário inexistente
- POST /users
- PUT /users/:id
- DELETE /users/:id

## Tecnologias

- Cypress
- JavaScript
- HTML
- CSS
- http-server
- ReqRes API
- Git
- GitHub
- GitHub Actions

## Estrutura

```text
qa-automation-previsao-do-tempo/
│
├── .github/
│   └── workflows/
│       └── cypress-tests.yml
│
├── app/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── cypress/
│   ├── e2e/
│   │   ├── previsao-tempo.cy.js
│   │   └── api-usuarios.cy.js
│   │
│   ├── fixtures/
│   └── support/
│
├── cypress.config.js
├── cypress.api.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
Como executar
Instalar dependências
npm install
Executar os testes
npm test
Abrir o Cypress
npm run serve

Em outro terminal:

npm run cy:open
Executar os testes de API

Configure a API key do ReqRes:

$env:CYPRESS_REQRES_API_KEY="SUA_API_KEY"

Depois execute:

npx cypress run --config-file cypress.api.config.js --spec "cypress/e2e/api-usuarios.cy.js"

A API key não é armazenada no código-fonte.

GitHub Actions

O projeto possui CI configurado com GitHub Actions.

A cada push na branch main, o pipeline executa automaticamente:

GitHub
   ↓
GitHub Actions
   ↓
┌───────────────┬───────────────┐
│   UI Tests    │   API Tests   │
│               │               │
│    Cypress    │    Cypress    │
└───────────────┴───────────────┘

Os testes de API utilizam a API key armazenada como GitHub Secret, mantendo a credencial fora do código.

Resultados

Atualmente o projeto possui:

8 testes de UI / E2E
7 testes de API
15 testes automatizados no total

Os resultados das execuções podem ser acompanhados pelo GitHub Actions.

Ver GitHub Actions

Próximos passos
Testes de acessibilidade com cypress-axe
Relatórios de execução
Screenshots e vídeos como artifacts do GitHub Actions
Maior cobertura de cenários
Testes de responsividade
Autor

Projeto desenvolvido como portfólio de QA Automation, com foco em Cypress, testes E2E, testes de API e CI/CD.