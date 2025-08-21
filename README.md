# 📝 TODO List - Fullstack Project

## Descrição

TODO List é uma aplicação web fullstack para gerenciamento de tarefas.
O projeto permite que usuários se cadastrem, façam login, criem, editem e removam tarefas.

O backend é construído com **NestJS**, enquanto o frontend usa **Next.js** com **TailwindCSS**.
O banco de dados utilizado é **PostgreSQL**, e a autenticação é feita via **JWT**.

---

## Tecnologias

- **Backend**: NestJS, TypeORM, PostgreSQL, JWT, bcrypt
- **Frontend**: Next.js, React, TailwindCSS
- **Ferramentas**: Docker, Docker Compose, Node.js, npm/yarn

---

## Funcionalidades

### Backend

- Cadastro de usuários
- Login com JWT
- CRUD de tarefas (Criar, Ler, Atualizar, Deletar)
- Autenticação e autorização

### Frontend

- Formulário de cadastro e login
- Dashboard com listagem de tarefas
- Adição e edição de tarefas
- Remoção de tarefas
- Logout
- Estilização responsiva com TailwindCSS

---

## Roadmap / Checklist

### Backend

- [x] Criar projeto NestJS

  - [x] Inicializar projeto com `nest new`
  - [x] Configurar TypeScript

- [x] Configurar TypeORM + PostgreSQL

  - [x] Instalar dependências
  - [x] Criar conexão com banco

- [x] Criar entidade User

  - [x] Definir campos: id, nome, email, senha
  - [x] Criar DTOs

- [ ] Criar entidade Task

  - [ ] Definir campos: id, título, descrição, status
  - [ ] Criar DTOs

- [ ] Implementar AuthModule (JWT + bcrypt)

  - [ ] Registro de usuário
  - [ ] Login com JWT

- [ ] Rotas CRUD de tarefas

  - [ ] Criar
  - [ ] Ler
  - [ ] Atualizar
  - [ ] Deletar

### Frontend

- [ ] Criar projeto Next.js

  - [ ] Configurar pasta pages
  - [ ] Configurar ambiente TypeScript

- [ ] Configurar TailwindCSS

  - [ ] Instalar dependências
  - [ ] Configurar arquivo tailwind.config.js

- [ ] Criar páginas de login/cadastro

  - [ ] Formulário login
  - [ ] Formulário cadastro

- [ ] Dashboard com listagem de tarefas

  - [ ] Listar tarefas do usuário
  - [ ] Botão editar/deletar

- [ ] Formulário adicionar/editar tarefa

  - [ ] Campos: título, descrição, status

- [ ] Logout
- [ ] Estilização básica

---

## Pré-requisitos

- Node.js >= 18
- npm ou yarn
- Docker (opcional, para banco de dados)

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/todo-list.git
cd todo-list
```

### 2. Configurar o banco de dados

- Usando Docker:

```bash
docker-compose up -d
```

- Verifique se o PostgreSQL está rodando na porta `5432`.
- Ajuste as variáveis de ambiente no backend (`.env`) com seu usuário, senha e database.

### 3. Instalar dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

## Executando o projeto

### Backend

```bash
cd backend
npm run start:dev
```

- O backend será iniciado em: `http://localhost:3001`

### Frontend

```bash
cd frontend
npm run dev
```

- O frontend será iniciado em: `http://localhost:3000`

---

## Estrutura do Projeto

```
todo-list/
├─ backend/
│  ├─ src/
│  │  ├─ users/
│  │  ├─ tasks/
│  │  ├─ app.module.ts
│  │  └─ main.ts
│  ├─ package.json
│  └─ tsconfig.json
├─ frontend/
│  ├─ pages/
│  ├─ components/
│  ├─ styles/
│  ├─ package.json
│  └─ tsconfig.json
├─ docker-compose.yml
└─ README.md
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` no backend com as seguintes variáveis:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=rodri_user
DB_PASSWORD=rodri_pass
DB_NAME=rodri_db
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=3600s
```

---

## Scripts úteis

### Backend

- `npm run start:dev` → Inicia o backend em modo de desenvolvimento
- `npm run build` → Compila o backend
- `npm run start` → Inicia o backend compilado

### Frontend

- `npm run dev` → Inicia o frontend em modo de desenvolvimento
- `npm run build` → Compila o frontend para produção
- `npm run start` → Inicia o frontend compilado

---

## Autor

Rodrigo Silva

---

## Licença

MIT
