const express = require("express");
const router = express.Router();
const connectDB = require("../db");

// GET /alunos -> listar alunos
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const alunos = db.collection("alunos");
    const lista = await alunos.find().toArray();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// POST /alunos -> cadastrar aluno
router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const alunos = db.collection("alunos");

    // adiciona campos automáticos
    const novoAluno = {
      ...req.body,
      situacao: "ativo",
      dataCadastro: new Date()
    };

    const resultado = await alunos.insertOne(novoAluno);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
