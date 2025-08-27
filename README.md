# 📝 TODO List - Aplicação Fullstack

Uma aplicação completa de gerenciamento de tarefas desenvolvida com tecnologias modernas, oferecendo autenticação segura, CRUD completo de tarefas e interface responsiva.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para APIs escaláveis
- **TypeScript** - Linguagem tipada para maior segurança
- **TypeORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação com tokens
- **bcrypt** - Hash seguro de senhas
- **Swagger** - Documentação automática da API
- **Jest** - Testes unitários

### Frontend
- **Next.js 15** - Framework React com SSR
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP
- **Vitest** - Framework de testes
- **js-cookie** - Gerenciamento de cookies

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

## 🏗️ Arquitetura do Projeto

```
todo-list/
├── back-end/          # API NestJS
├── frontend/          # Interface Next.js
└── docker-compose.yml # Configuração do banco
```

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- **Registro de usuários** com validação completa
- **Login seguro** com JWT + Refresh Token
- **Hash de senhas** com bcrypt
- **Autorização baseada em roles** (USER, ADMIN)
- **Guards de proteção** para rotas sensíveis
- **Gerenciamento de sessão** com cookies seguros

### 📋 Gerenciamento de Tarefas
- **Criação de tarefas** com título e descrição
- **Listagem de tarefas** do usuário autenticado
- **Edição de tarefas** existentes
- **Exclusão de tarefas** com confirmação
- **Estados de tarefa**: Pendente, Em Progresso, Concluída
- **Filtragem por status** de tarefa
- **Relacionamentos** usuário-tarefa

### 🎨 Interface de Usuário
- **Design responsivo** com Tailwind CSS
- **Componentes acessíveis** com Radix UI
- **Tema dark/light** configurável
- **Feedback visual** para ações do usuário
- **Validação em tempo real** dos formulários
- **Toast notifications** para feedback

### 🧪 Qualidade de Código
- **Testes unitários** abrangentes (33 testes)
- **Documentação API** com Swagger
- **Tipagem completa** com TypeScript
- **Linting e formatação** automatizados
- **Arquitetura modular** e escalável

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+
- pnpm
- Docker e Docker Compose

### 1. Clone o repositório
```bash
git clone https://github.com/rdGxd/todo-list.git
cd todo-list
```

### 2. Configure o banco de dados
```bash
# Inicia o PostgreSQL via Docker
docker-compose up -d
```

### 3. Configure o Backend
```bash
cd back-end

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Execute as migrations (se houver)
pnpm run build
pnpm run start:dev
```

### 4. Configure o Frontend
```bash
cd frontend

# Instale as dependências
pnpm install

# Execute em modo desenvolvimento
pnpm run dev
```

## 🔧 Variáveis de Ambiente

### Backend (.env)
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=admin
DATABASE_NAME=todo_list

# JWT
JWT_SECRET=seu_jwt_secret_aqui
JWT_TTL=3600
JWT_REFRESH_TTL=86400
JWT_TOKEN_AUDIENCE=localhost:3000
JWT_TOKEN_ISSUER=localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📊 Endpoints da API

### 🔐 Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/refresh` - Renovar tokens

### 👤 Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar usuários (ADMIN)
- `GET /users/:id` - Buscar usuário específico
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Remover usuário

### 📋 Tarefas (todas requerem autenticação)
- `POST /task` - Criar tarefa
- `GET /task` - Listar tarefas do usuário
- `GET /task/:id` - Buscar tarefa por ID
- `GET /task/status/:status` - Filtrar por status
- `PATCH /task/:id` - Atualizar tarefa
- `DELETE /task/:id` - Remover tarefa

## 📖 Documentação da API

A documentação completa da API está disponível via Swagger:
- **Desenvolvimento**: http://localhost:3000/api/docs
- **Produção**: [URL da produção]/api/docs

## 🧪 Testes

### Backend
```bash
cd back-end

# Testes unitários
pnpm run test

# Testes com cobertura
pnpm run test:cov

# Testes E2E
pnpm run test:e2e
```

### Frontend
```bash
cd frontend

# Testes unitários
pnpm run test

# Testes em modo watch
pnpm run test:watch
```

## 📁 Estrutura do Backend

```
back-end/src/
├── auth/               # Módulo de autenticação
│   ├── guards/         # Guards de proteção
│   ├── services/       # Lógica de autenticação
│   ├── dto/           # Data Transfer Objects
│   └── decorators/    # Decorators customizados
├── users/             # Módulo de usuários
│   ├── entities/      # Entidades do banco
│   ├── controller/    # Controllers REST
│   ├── service/       # Lógica de negócio
│   └── dto/          # DTOs de usuário
├── task/              # Módulo de tarefas
│   ├── entities/      # Entidade Task
│   ├── controller/    # Controller de tarefas
│   ├── service/       # Service de tarefas
│   └── dto/          # DTOs de tarefa
└── global/            # Configurações globais
    ├── pipes.config.ts
    ├── swagger.config.ts
    └── typeOrmModule.config.ts
```

## 📁 Estrutura do Frontend

```
frontend/src/
├── app/               # App Router do Next.js
│   ├── page.tsx       # Página inicial (login/registro)
│   └── tasks/         # Página de tarefas
├── components/        # Componentes UI
│   ├── ui/           # Componentes base
│   └── themes/       # Tema dark/light
├── forms/            # Formulários
│   ├── login/        # Formulário de login
│   ├── create-user/  # Formulário de registro
│   ├── new-task/     # Formulário de nova tarefa
│   └── edit-task/    # Formulário de edição
├── pages/            # Páginas da aplicação
│   ├── UserLogin/    # Página de login
│   ├── UserRegister/ # Página de registro
│   └── Task/         # Página de tarefas
├── services/         # Serviços de API
│   ├── axios/        # Configuração HTTP
│   ├── user/         # Serviços de usuário
│   └── task/         # Serviços de tarefa
├── lib/              # Utilitários
│   ├── utils.ts      # Funções utilitárias
│   └── validations/  # Schemas de validação
└── types/            # Tipos TypeScript
    └── tasks.ts      # Tipos de tarefa
```

## 🔒 Segurança Implementada

### Backend
- **Autenticação JWT** com access e refresh tokens
- **Hash de senhas** com bcrypt (salt rounds: 10)
- **Guards de autorização** baseados em roles
- **Validação de DTOs** com class-validator
- **Proteção CORS** configurada
- **Sanitização de inputs** automática

### Frontend
- **Tokens em cookies** HTTPOnly para segurança
- **Validação client-side** com Zod schemas
- **Proteção de rotas** baseada em autenticação
- **Sanitização de entradas** de usuário
- **Headers de segurança** configurados

## 🚀 Deploy

### Backend
```bash
# Build de produção
pnpm run build

# Iniciar em produção
pnpm run start:prod
```

### Frontend
```bash
# Build de produção
pnpm run build

# Iniciar servidor de produção
pnpm run start
```

### Docker (Recomendado)
```bash
# Build e execução com Docker Compose
docker-compose up --build
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Desenvolvedor**: Rodrigo Silva
**GitHub**: [@rdGxd](https://github.com/rdGxd)
**Projeto**: [https://github.com/rdGxd/todo-list](https://github.com/rdGxd/todo-list)

## 🎯 Roadmap Futuro

- [ ] **Implementar notificações em tempo real** com WebSockets
- [ ] **Adicionar sistema de categorias** para tarefas
- [ ] **Implementar lembretes e prazos** para tarefas
- [ ] **Adicionar dashboard com métricas** de produtividade
- [ ] **Implementar colaboração** entre usuários
- [ ] **Adicionar upload de anexos** nas tarefas
- [ ] **Implementar modo offline** com sincronização
- [ ] **Adicionar API de relatórios** em PDF/Excel
- [ ] **Implementar cache Redis** para performance
- [ ] **Adicionar testes de integração** end-to-end

## ⚡ Performance

- **Lazy loading** de componentes
- **Otimização de imagens** automática
- **Cache de requisições** com Axios
- **Bundle splitting** automático
- **Compressão** de assets em produção

## 🌐 Internacionalização

Estrutura preparada para suporte a múltiplos idiomas:
- Português (atual)
- Inglês (planejado)
- Espanhol (planejado)

---

**Desenvolvido com ❤️ por [Rodrigo Silva](https://github.com/rdGxd)**

---

### 4. Execute a aplicação

#### Backend
```bash
cd back-end
pnpm run start:dev
```

#### Frontend
```bash
cd frontend
pnpm run dev
```

A aplicação estará disponível em:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api/docs

---

## Como usar a aplicação

1. **Acesse a página inicial** em http://localhost:3000
2. **Registre um novo usuário** ou faça login com um existente
3. **Crie tarefas** usando o formulário na página de tarefas
4. **Edite tarefas** clicando no botão "Editar"
5. **Marque como concluída** alterando o status
6. **Exclua tarefas** usando o botão "Apagar"

---
