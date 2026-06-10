const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tarefas",
      version: "1.0.0",
      description:
        "API REST simples para gerenciamento de tarefas (CRUD) construída com Express e documentada com Swagger.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Tarefa: {
          type: "object",
          required: ["titulo"],
          properties: {
            id: {
              type: "integer",
              description: "Identificador único da tarefa",
              example: 1,
            },
            titulo: {
              type: "string",
              description: "Título da tarefa",
              example: "Estudar Node.js",
            },
            concluida: {
              type: "boolean",
              description: "Indica se a tarefa foi concluída",
              example: false,
            },
          },
        },
        TarefaInput: {
          type: "object",
          required: ["titulo"],
          properties: {
            titulo: {
              type: "string",
              example: "Estudar Node.js",
            },
            concluida: {
              type: "boolean",
              example: false,
            },
          },
        },
        Erro: {
          type: "object",
          properties: {
            mensagem: {
              type: "string",
              example: "Tarefa não encontrada",
            },
          },
        },
      },
    },
  },
  // Arquivos onde o swagger-jsdoc vai procurar pelos comentários de documentação
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
