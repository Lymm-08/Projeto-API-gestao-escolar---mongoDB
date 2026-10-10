const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const connectDB = require("../db");

async function getCollection() {
  const db = await connectDB();
  return db.collection("alunos");
}

function validarAluno(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Os dados do aluno são obrigatórios";
  }
  if (typeof body.nome !== "string" || !body.nome.trim()) {
    return "Nome é obrigatório";
  }
  if (typeof body.idade !== "number" || !Number.isFinite(body.idade)) {
    return "Idade deve ser um número";
  }
  return null;
}

// Listar todos
router.get("/", async (req, res) => {
  try {
    const alunos = await getCollection();
    res.json(await alunos.find().toArray());
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// Cadastrar aluno
router.post("/", async (req, res) => {
  const erroValidacao = validarAluno(req.body);
  if (erroValidacao) return res.status(400).json({ erro: erroValidacao });

  try {
    const alunos = await getCollection();
    const novoAluno = { ...req.body, situacao: "ativo", dataCadastro: new Date() };
    res.status(201).json(await alunos.insertOne(novoAluno));
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ erro: "ID inválido" });
    const alunos = await getCollection();
    const aluno = await alunos.findOne({ _id: new ObjectId(req.params.id) });
    aluno ? res.json(aluno) : res.status(404).json({ erro: "Aluno não encontrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// Atualizar aluno
router.put("/:id", async (req, res) => {
  const erroValidacao = validarAluno(req.body);
  if (erroValidacao) return res.status(400).json({ erro: erroValidacao });

  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ erro: "ID inválido" });
    const alunos = await getCollection();
    const resultado = await alunos.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    resultado.matchedCount ? res.json({ mensagem: "Atualizado com sucesso" }) : res.status(404).json({ erro: "Aluno não encontrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// Remover aluno
router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ erro: "ID inválido" });
    const alunos = await getCollection();
    const resultado = await alunos.deleteOne({ _id: new ObjectId(req.params.id) });
    resultado.deletedCount ? res.json({ mensagem: "Removido com sucesso" }) : res.status(404).json({ erro: "Aluno não encontrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

module.exports = router;
