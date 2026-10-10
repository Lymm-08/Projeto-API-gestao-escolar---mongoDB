# API de Gestão Escolar

API REST para gerenciamento de alunos, desenvolvida com Node.js, Express e MongoDB.

## Funcionalidades

- Listar alunos cadastrados.
- Cadastrar um aluno.
- Consultar e atualizar um aluno pelo ID.
- Remover um aluno pelo ID.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/) e [Supertest](https://github.com/ladjs/supertest) para testes automatizados.

## Requisitos

- Node.js e npm instalados.
- Uma instância do MongoDB acessível pela aplicação.

## Como executar

1. Instale as dependências do projeto:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e configure a conexão com o MongoDB:

   ```env
   MONGO_URI=mongodb://localhost:27017
   PORT=3000
   ```

   A aplicação usa o banco `gestao_escolar` e a coleção `alunos`. O arquivo `.env` não deve ser versionado.

3. Inicie o servidor:

   ```bash
   npm start
   ```

Por padrão, a API fica disponível em `http://localhost:3000`. A porta pode ser alterada pela variável `PORT`.

## Rotas

Todas as rotas usam o prefixo `/alunos`. Os corpos das requisições de criação e atualização devem ser enviados em JSON e conter `nome` (texto não vazio) e `idade` (número).

| Método | Rota | Descrição | Códigos de resposta |
| --- | --- | --- | --- |
| `GET` | `/alunos` | Retorna a lista de alunos. | `200`, `500` |
| `POST` | `/alunos` | Cadastra um aluno. | `201`, `400`, `500` |
| `GET` | `/alunos/:id` | Busca um aluno pelo ID. | `200`, `400`, `404`, `500` |
| `PUT` | `/alunos/:id` | Atualiza nome e idade de um aluno. | `200`, `400`, `404`, `500` |
| `DELETE` | `/alunos/:id` | Remove um aluno pelo ID. | `200`, `400`, `404`, `500` |

### Exemplo de cadastro

```json
{
  "nome": "Maria",
  "idade": 15
}
```

A API acrescenta `situacao: "ativo"` e `dataCadastro` ao documento e retorna o resultado da inserção com HTTP `201`.

### Exemplo de atualização

```http
PUT /alunos/507f1f77bcf86cd799439011
Content-Type: application/json
```

```json
{
  "nome": "Maria",
  "idade": 16
}
```

### Respostas de erro

As respostas de erro seguem o formato JSON `{"erro":"mensagem"}`. Dados inválidos ou IDs malformados retornam HTTP `400`; um aluno com ID válido, mas inexistente, retorna HTTP `404`; falhas inesperadas do servidor retornam HTTP `500`.

## Testes

Execute a suíte automatizada com Jest e Supertest:

```bash
npm test
```

Os testes cobrem as rotas GET, POST, PUT e DELETE de `/alunos`, incluindo validação de nome e idade, JSON inválido, ID malformado e aluno inexistente. O MongoDB é simulado com `jest.mock`; não é necessário iniciar um banco para executar os testes.

## Estrutura do projeto

```text
.
├── src/
│   ├── routes/
│   │   └── alunos.js
│   ├── app.js
│   └── db.js
├── tests/
│   └── alunos.test.js
├── imagens/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Imagens

Capturas de tela do banco de dados e de exemplos de requisições:

| Banco de dados | Cadastro (`POST`) |
| --- | --- |
| ![Visualização do banco de dados](imagens/Banco%20de%20dados.png) | ![Exemplo de cadastro](imagens/POST.png) |

| Remoção (`DELETE`) | Consultas (`GET`) |
| --- | --- |
| ![Exemplo de remoção](imagens/DELETE.png) | ![Resultado de consulta](imagens/GET1ac.png) |

Outras capturas de consultas e da lista após a remoção:

- [GET após o cadastro](imagens/GET2dd.png)
- [Lista após a remoção](imagens/GET3ld.png)
- [Lista de alunos após a remoção](imagens/listaDepoisDoDelet.png)
