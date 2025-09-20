const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());


let alunos = [];

// CREATE (C)
app.post("/alunos", (req, res) => {
  const { nome, email, celular, cidade } = req.body;
  const novoAluno = { id: alunos.length + 1, nome, email, celular, cidade };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// READ (R) - todos
app.get("/alunos", (req, res) => {
  res.json(alunos);
});

// READ -  por id
app.get("/alunos/:id", (req, res) => {
  const aluno = alunos.find(a => a.id == req.params.id);
  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }
  res.json(aluno);
});

// UPDATE (U)
app.put("/alunos/:id", (req, res) => {
  const aluno = alunos.find(a => a.id == req.params.id);
  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  const { nome, email, celular, cidade } = req.body;
  aluno.nome = nome || aluno.nome;
  aluno.email = email || aluno.email;
  aluno.celular = celular || aluno.celular;
  aluno.cidade = cidade || aluno.cidade;

  res.json(aluno);
});

// DELETE (D)
app.delete("/alunos/:id", (req, res) => {
  const index = alunos.findIndex(a => a.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }
  alunos.splice(index, 1);
  res.json({ mensagem: "Aluno removido com sucesso" });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
