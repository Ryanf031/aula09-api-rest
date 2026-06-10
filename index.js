const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Documentação Swagger disponível em /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// "Banco de dados" em memória
let tarefas = [
  { id: 1, titulo: "Estudar Express", concluida: false },
  { id: 2, titulo: "Estudar Swagger", concluida: false },
];
let proximoId = 3;

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota raiz da API
 *     tags: [Geral]
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas com link para a documentação
 */
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Tarefas no ar! Acesse /api-docs para ver a documentação Swagger.",
  });
});

/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Tarefas]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 */
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.get("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  res.json(tarefa);
});

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TarefaInput'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.post("/tarefas", (req, res) => {
  const { titulo, concluida } = req.body;

  if (!titulo || typeof titulo !== "string") {
    return res
      .status(400)
      .json({ mensagem: "O campo 'titulo' é obrigatório e deve ser uma string" });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo,
    concluida: Boolean(concluida) || false,
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TarefaInput'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  const { titulo, concluida } = req.body;

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = Boolean(concluida);

  res.json(tarefa);
});

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  const [tarefaRemovida] = tarefas.splice(index, 1);
  res.json(tarefaRemovida);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});
