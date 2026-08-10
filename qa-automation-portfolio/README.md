# QA Automation — Previsão do Tempo

Projeto de portfólio em **automação de testes com Cypress**, cobrindo dois
tipos de teste comuns em vagas de QA:

- **Testes de UI (E2E)** sobre a aplicação [Previsão do Tempo](https://github.com/jmmedeiross/Previsao-do-Tempo), usando `cy.intercept` para simular as respostas da API de clima — os testes rodam de forma rápida e confiável, sem depender de internet ou de chave de API real.
- **Testes de API** independentes de interface, validando contrato (status code, schema, tipos de dados) de uma API REST pública (CRUD completo: GET, POST, PUT, DELETE).

## Por que este projeto existe

Fui construindo esse projeto para demonstrar, na prática, competências de QA
Automation a partir da minha experiência como desenvolvedor (JavaScript,
integração de APIs, CI/CD com GitHub Actions). A ideia não é só "saber
Cypress", mas mostrar raciocínio de teste: casos de sucesso, casos de erro,
borda (campo vazio, espaços em branco) e independência de dados externos.

## Stack

- [Cypress](https://www.cypress.io/) — framework de testes E2E e de API
- `http-server` — sobe a aplicação estática localmente para os testes de UI
- `start-server-and-test` — sobe o servidor, espera ficar disponível e só então roda os testes
- API pública [ReqRes](https://reqres.in) — alvo dos testes de API

## Estrutura do projeto

```
qa-automation-portfolio/
├── app/                        # aplicação sob teste (Previsão do Tempo)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── cypress/
│   ├── e2e/
│   │   ├── previsao-tempo.cy.js   # testes de UI (7 cenários)
│   │   └── api-usuarios.cy.js     # testes de API (GET/POST/PUT/DELETE)
│   ├── fixtures/                  # dados simulados (mocks) da API de clima
│   └── support/
│       ├── commands.js            # comando customizado buscarCidade()
│       └── e2e.js
├── cypress.config.js
└── package.json
```

## Cenários de teste cobertos

**UI (`previsao-tempo.cy.js`)**
- Estado inicial da tela
- Busca de cidade com sucesso (atualização de temperatura, descrição e umidade)
- Verificação de que a cidade digitada é enviada corretamente na requisição
- Busca sequencial de mais de uma cidade (dados sendo atualizados corretamente)
- Cidade não encontrada (erro 404 da API)
- API indisponível (erro de rede)
- Campo de busca vazio (validação de front-end, sem chamar a API)
- Espaços em branco no início/fim do nome da cidade

**API (`api-usuarios.cy.js`)**
- Listagem paginada de usuários (GET)
- Validação de schema e tipos de cada usuário retornado
- Busca de usuário específico por ID
- Usuário inexistente retorna 404
- Criação de usuário (POST) retorna 201 com os dados corretos
- Atualização de usuário (PUT) retorna os campos atualizados
- Remoção de usuário (DELETE) retorna 204

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar tudo de uma vez (sobe o servidor local + roda os testes)
npm test

# Ou, para desenvolvimento/depuração com interface visual do Cypress:
npm run serve        # em um terminal, sobe a aplicação em http://127.0.0.1:5500
npm run cy:open       # em outro terminal, abre o Cypress
```

## Próximos passos

- Adicionar o pipeline em GitHub Actions para rodar os testes automaticamente a cada push
- Adicionar testes de acessibilidade básica (cypress-axe)
- Adicionar relatório de execução (mochawesome)
