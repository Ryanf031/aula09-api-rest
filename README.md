# API de Tarefas — Express + Swagger

API REST simples para gerenciamento de tarefas (CRUD), construída com **Node.js**, **Express** e documentada com **Swagger** (OpenAPI 3.0).

## 📁 Estrutura do projeto

```
api-express-swagger/
├── index.js        # Arquivo principal: servidor e rotas
├── swagger.js       # Configuração do Swagger (swagger-jsdoc)
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```
   ou, em modo desenvolvimento (reinicia automaticamente ao salvar):
   ```bash
   npm run dev
   ```

3. A API estará disponível em:
   - `http://localhost:3000` — rota raiz
   - `http://localhost:3000/api-docs` — documentação Swagger (interface interativa)

## 📌 Endpoints disponíveis

| Método | Rota            | Descrição                         |
|--------|-----------------|-------------------------------------|
| GET    | `/tarefas`      | Lista todas as tarefas              |
| GET    | `/tarefas/:id`  | Busca uma tarefa pelo ID            |
| POST   | `/tarefas`      | Cria uma nova tarefa                |
| PUT    | `/tarefas/:id`  | Atualiza uma tarefa existente       |
| DELETE | `/tarefas/:id`  | Remove uma tarefa                   |

### Exemplo de corpo (POST/PUT)
```json
{
  "titulo": "Estudar Node.js",
  "concluida": false
}
```

## 📖 Documentação Swagger

Toda a documentação interativa é gerada automaticamente a partir dos comentários `@swagger` presentes no `index.js`, usando `swagger-jsdoc` + `swagger-ui-express`. Acesse `/api-docs` para testar os endpoints diretamente pelo navegador.

## ☁️ Como publicar no GitHub

1. Crie um repositório novo no GitHub (público ou com acesso liberado ao professor).
2. No terminal, dentro da pasta do projeto, execute:
   ```bash
   git init
   git add .
   git commit -m "API REST com Express e Swagger"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
   git push -u origin main
   ```
3. Confira no GitHub se os arquivos `index.js`, `package.json` e `.gitignore` foram enviados (a pasta `node_modules` **não** deve aparecer).
4. Copie o link do repositório e entregue no AVA.
