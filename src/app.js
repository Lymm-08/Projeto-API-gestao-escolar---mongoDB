const express = require("express");
const app = express();
require("dotenv").config();

const alunosRouter = require("./routes/alunos");

app.use(express.json());
app.use("/alunos", alunosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
