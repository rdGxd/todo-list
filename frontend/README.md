# 📋 Todo List Frontend

Uma aplicação frontend moderna para gerenciamento de tarefas construída com Next.js, React e TypeScript.

## 🚀 Tecnologias Utilizadas

### Core
- **Next.js 15.5.0** - Framework React com SSR e App Router
- **React 19.1.0** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS v4** - Framework CSS utilitário

### UI e Componentes
- **Radix UI** - Componentes acessíveis e sem estilo
- **Lucide React** - Ícones modernos
- **class-variance-authority** - Utilitário para variantes de componentes
- **tailwind-merge** - Merge inteligente de classes Tailwind
- **next-themes** - Sistema de temas (claro/escuro)

### Formulários e Validação
- **React Hook Form** - Gerenciamento eficiente de formulários
- **Zod** - Validação de esquemas TypeScript-first
- **@hookform/resolvers** - Resolvers para integração com bibliotecas de validação

### Estado e Requisições
- **Axios** - Cliente HTTP para requisições à API
- **js-cookie** - Gerenciamento de cookies
- **react-toastify** - Notificações toast

### Testes
- **Vitest** - Framework de testes rápido
- **@testing-library/react** - Utilitários para testes de componentes
- **Playwright** - Testes end-to-end
- **@vitest/browser** - Testes no navegador

## 🏗️ Arquitetura

```
src/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial (Login/Registro)
│   └── tasks/             # Rota protegida para tarefas
├── components/            # Componentes reutilizáveis
│   ├── ui/                # Componentes base da UI
│   └── themes/            # Componentes de tema
├── forms/                 # Formulários específicos
│   ├── create-user/       # Formulário de criação de usuário
│   ├── edit-task/         # Formulário de edição de tarefa
│   ├── login/             # Formulário de login
│   └── new-task/          # Formulário de nova tarefa
├── lib/                   # Utilitários e configurações
│   ├── utils.ts           # Funções utilitárias
│   └── validations/       # Esquemas de validação Zod
├── pages/                 # Componentes de página
│   ├── Task/              # Página de gerenciamento de tarefas
│   ├── UserLogin/         # Página de login
│   └── UserRegister/      # Página de registro
├── services/              # Serviços de API
│   ├── axios/             # Configuração do Axios
│   ├── task/              # Serviços relacionados a tarefas
│   └── user/              # Serviços relacionados a usuários
├── types/                 # Definições de tipos TypeScript
└── __tests__/             # Testes organizados por funcionalidade
```

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação
- **Login de usuários** com validação de email e senha
- **Registro de novos usuários** com validação de dados
- **Gerenciamento de tokens** JWT com refresh token
- **Armazenamento seguro** de tokens em cookies
- **Proteção de rotas** para usuários autenticados

### 📝 Gerenciamento de Tarefas
- **Criação de tarefas** com título e descrição
- **Listagem de tarefas** do usuário autenticado
- **Edição de tarefas** existentes
- **Exclusão de tarefas** com confirmação
- **Estados de tarefa**: Pendente, Em Progresso, Concluída
- **Validação de formulários** com feedback visual

### 🎨 Interface de Usuário
- **Design responsivo** adaptável a diferentes telas
- **Modo escuro/claro** com persistência de preferência
- **Componentes acessíveis** baseados em Radix UI
- **Notificações toast** para feedback de ações
- **Animações suaves** e transições
- **Loading states** durante operações assíncronas

### 🧪 Testes
- **Testes unitários** para componentes
- **Testes de integração** para formulários
- **Testes no navegador** com Playwright
- **Configuração de CI/CD** pronta para testes automatizados

## 🚦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento (Turbopack)

# Build e Deploy
pnpm build        # Gera build de produção
pnpm start        # Inicia servidor de produção

# Qualidade de Código
pnpm lint         # Executa linting com ESLint
pnpm test         # Executa testes com Vitest
pnpm test:browser # Executa testes no navegador
```

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clone o repositório
git clone <repository-url>

# Navegue para o diretório do frontend
cd frontend

# Instale as dependências
pnpm install

# Execute o servidor de desenvolvimento
pnpm dev
```

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📱 Páginas e Rotas

### Páginas Públicas
- `/` - Página inicial com formulários de login e registro lado a lado

### Páginas Protegidas
- `/tasks` - Dashboard principal para gerenciamento de tarefas

## 🎯 Validações Implementadas

### Login
- Email deve ter formato válido
- Senha deve ter pelo menos 6 caracteres

### Criação de Usuário
- Validações personalizadas para dados do usuário

### Tarefas
- Título: 2-100 caracteres
- Descrição: 5-255 caracteres
- Status: PENDING | IN_PROGRESS | COMPLETED

## 🔒 Segurança

- **Autenticação JWT** com tokens de acesso e refresh
- **Proteção CSRF** com cookies HTTPOnly
- **Validação client-side e server-side**
- **Sanitização de inputs** com Zod schemas
- **Headers de segurança** configurados

## 🎨 Sistema de Design

### Temas
- Suporte a modo claro e escuro
- Persistência de preferência do usuário
- Transições suaves entre temas

### Componentes UI
- Sistema consistente de cores
- Tipografia responsiva
- Espaçamento padronizado
- Estados de hover e focus acessíveis

## 🧪 Estratégia de Testes

### Tipos de Teste
- **Unitários**: Componentes isolados
- **Integração**: Formulários e fluxos de usuário
- **Browser**: Testes end-to-end com Playwright

### Cobertura
- Componentes de formulário
- Validações
- Serviços de API
- Utilitários

## 📈 Performance

### Otimizações Implementadas
- **Turbopack** para builds mais rápidos
- **Code splitting** automático do Next.js
- **Lazy loading** de componentes
- **Otimização de imagens** com next/image
- **Bundle analysis** disponível

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do React](https://react.dev)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do Radix UI](https://www.radix-ui.com/docs)
- [Documentação do Vitest](https://vitest.dev)

---

Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento frontend.
