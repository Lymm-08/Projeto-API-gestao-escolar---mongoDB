const express = require("express");
const app = express();
require("dotenv").config();

const alunosRouter = require("./routes/alunos");

app.use(express.json());
app.use("/alunos", alunosRouter);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido" });
  }

  console.error(err);
  return res.status(500).json({ erro: "Erro interno do servidor" });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
