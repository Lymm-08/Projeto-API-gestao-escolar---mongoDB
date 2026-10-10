# Gestão Escolar 

Backend para gerenciamento de alunos, feito com **Node.js**, **Express** e **MongoDB**.  
Permite operações de **GET**, **POST** e **DELETE** para manipular dados de alunos.

---

##  Tecnologias
- **Node.js**  
- **Express**  
- **MongoDB**  
- **Thunder Client** (para testes de API)

---

##  Estrutura do projeto
```
gestao_escolar/
│── src/
│   ├── routes/
│   │   └── alunos.js
│   ├── app.js
│   └── db.js
│── .env
│── package.json
│── README.md
│── imagens/   ← pasta para prints
```

---

##  Como rodar localmente
1. **Instalar dependências**  
   ```bash
   npm install
   ```

2. **Configurar `.env`**  
   ```env
   MONGO_URI=mongodb://localhost:27017/gestao_escolar
   ```

3. **Iniciar MongoDB local**  
   - Crie a pasta `C:\data\db` (Windows) ou `/data/db` (Linux/macOS).  
   - Rode o serviço `mongod` para ativar o servidor na porta `27017`.

4. **Rodar o servidor Node.js**  
   ```bash
   npm start
   ```
   O backend estará disponível em `http://localhost:3000`.

---

##  Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/alunos` | Lista todos os alunos |
| POST | `/alunos` | Cadastra um novo aluno |
| GET | `/alunos/:id` | Busca um aluno pelo ID |
| PUT | `/alunos/:id` | Atualiza os dados de um aluno |
| DELETE | `/alunos/:id` | Remove um aluno pelo ID |

Exemplo de corpo para **POST /alunos**:
  ```json
  {
    "nome": "Maria",
    "idade": 15
  }
  ```

## Testes

Execute os testes automatizados com:

```bash
npm test
```

Os testes cobrem a listagem de alunos, o cadastro com dados válidos e a resposta para JSON inválido, além da remoção de um aluno existente e dos casos de ID inexistente ou inválido. O acesso ao MongoDB é simulado com `jest.mock`, sem necessidade de um banco em execução. As ferramentas usadas são **Jest** e **Supertest**.

---

##  Prints

### Banco de dados
![Banco de dados](imagens/Banco%20de%20dados.png)

### GET antes de cadastrar
![GET antes de cadastrar](imagens/GET%20antes%20de%20cadastrar.png)

### POST (cadastro de aluno)
![POST](imagens/POST.png)

### 3 alunos cadastrados
![3 alunos cadastrados](imagens/3%20alunos%20cadastrados.png)

### DELETE
![DELETE](imagens/DELETE.png)

### GET depois do DELETE
![GET depois do DELETE](imagens/GET_depois_do_DELETE.png)

### GET lista depois do DELETE
![GET lista depois do DELETE](imagens/GET_lista_depois_do_DELETE.png)

### Lista depois do DELETE
![Lista depois do DELETE](imagens/lista_depois_do_DELETE.png)
---
