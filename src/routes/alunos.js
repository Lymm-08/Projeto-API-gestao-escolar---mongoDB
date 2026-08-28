const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const connectDB = require("../db");

// GET /alunos -> listar todos
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

// GET /alunos/:id -> buscar aluno por ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const db = await connectDB();
    const alunos = db.collection("alunos");
    const aluno = await alunos.findOne({ _id: new ObjectId(id) });

    if (!aluno) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json(aluno);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// PUT /alunos/:id -> atualizar aluno
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const db = await connectDB();
    const alunos = db.collection("alunos");
    const resultado = await alunos.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json({ mensagem: "Aluno atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// DELETE /alunos/:id -> remover aluno
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const db = await connectDB();
    const alunos = db.collection("alunos");
    const resultado = await alunos.deleteOne({ _id: new ObjectId(id) });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json({ mensagem: "Aluno removido com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;