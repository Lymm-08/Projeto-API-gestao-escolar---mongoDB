const request = require("supertest");
const connectDB = require("../src/db");
const app = require("../src/app");

jest.mock("../src/db", () => jest.fn());

const collection = {
  find: jest.fn(),
  insertOne: jest.fn(),
  deleteOne: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  connectDB.mockResolvedValue({
    collection: jest.fn().mockReturnValue(collection),
  });
});

describe("GET /alunos", () => {
  it("retorna a lista de alunos", async () => {
    const alunos = [{ nome: "Maria", idade: 15 }];
    collection.find.mockReturnValue({ toArray: jest.fn().mockResolvedValue(alunos) });

    const response = await request(app).get("/alunos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(alunos);
    expect(collection.find).toHaveBeenCalledWith();
  });
});

describe("POST /alunos", () => {
  it("cadastra um aluno com dados válidos", async () => {
    const resultado = { acknowledged: true, insertedId: "aluno-id" };
    collection.insertOne.mockResolvedValue(resultado);

    const response = await request(app)
      .post("/alunos")
      .send({ nome: "Maria", idade: 15 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(resultado);
    expect(collection.insertOne).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: "Maria",
        idade: 15,
        situacao: "ativo",
        dataCadastro: expect.any(Date),
      }),
    );
  });

  it("retorna erro 400 para JSON inválido", async () => {
    const response = await request(app)
      .post("/alunos")
      .set("Content-Type", "application/json")
      .send('{"nome":');

    expect(response.status).toBe(400);
    expect(connectDB).not.toHaveBeenCalled();
  });
});

describe("DELETE /alunos/:id", () => {
  it("remove um aluno existente", async () => {
    collection.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const response = await request(app).delete("/alunos/507f1f77bcf86cd799439011");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ mensagem: "Removido com sucesso" });
    expect(collection.deleteOne).toHaveBeenCalledWith({
      _id: expect.any(Object),
    });
  });

  it("retorna erro 404 quando o aluno não existe", async () => {
    collection.deleteOne.mockResolvedValue({ deletedCount: 0 });

    const response = await request(app).delete("/alunos/507f1f77bcf86cd799439011");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ erro: "Aluno não encontrado" });
  });

  it("retorna erro 400 para um ID inválido", async () => {
    const response = await request(app).delete("/alunos/id-invalido");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: "ID inválido" });
    expect(connectDB).not.toHaveBeenCalled();
  });
});
