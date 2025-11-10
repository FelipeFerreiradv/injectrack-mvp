# Estrutura do Projeto InjecTrack

## Visão Geral

```
injectrack-mvp/
├── src/                          # Frontend React Native
│   ├── components/               # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── index.ts
│   ├── screens/                  # Telas do app
│   │   ├── OnboardingScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   └── RegisterInjectionScreen.tsx
│   ├── navigation/               # Configuração de navegação
│   ├── api/                      # Cliente API
│   │   └── client.ts
│   ├── store/                    # Redux store (futuro)
│   ├── utils/                    # Utilitários
│   │   ├── constants.ts
│   │   └── storage.ts
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   ├── __tests__/                # Testes unitários
│   │   ├── Button.test.tsx
│   │   └── api.test.ts
│   ├── App.tsx                   # Componente principal
│   └── index.ts                   # Entry point
├── backend/                      # Backend Node.js
│   ├── src/
│   │   ├── routes/               # Rotas da API
│   │   │   ├── analyze-photo.ts
│   │   │   ├── injections.ts
│   │   │   ├── daily-logs.ts
│   │   │   ├── subscription.ts
│   │   │   └── user.ts
│   │   └── index.ts              # Servidor Express
│   ├── database/
│   │   └── schema.sql            # Esquema do banco
│   ├── package.json
│   └── tsconfig.json
├── docs/                         # Documentação
│   ├── ML_MODEL_SPEC.md          # Especificação do modelo ML
│   ├── WIREFRAMES.md             # Wireframes
│   └── LGPD_PRIVACY.md           # Política de privacidade
├── assets/                       # Assets (imagens, ícones)
├── package.json                  # Dependências frontend
├── tsconfig.json                 # Config TypeScript frontend
├── app.json                      # Config Expo
├── babel.config.js               # Config Babel
├── jest.config.js                # Config Jest
├── README.md                     # Documentação principal
└── PROJECT_STRUCTURE.md          # Este arquivo
```

## Descrição das Pastas

### `/src` - Frontend React Native
- **components/**: Componentes reutilizáveis (Button, Input, Card, etc.)
- **screens/**: Telas principais do app
- **navigation/**: Configuração de navegação (Stack, Tabs)
- **api/**: Cliente HTTP para comunicação com backend
- **store/**: Gerenciamento de estado (Redux Toolkit)
- **utils/**: Funções utilitárias e constantes
- **types/**: Definições TypeScript
- **__tests__/**: Testes unitários

### `/backend` - Backend Node.js
- **src/routes/**: Rotas da API REST
- **database/**: Scripts SQL e migrations
- **src/index.ts**: Servidor Express principal

### `/docs` - Documentação
- **ML_MODEL_SPEC.md**: Especificação técnica do modelo ML
- **WIREFRAMES.md**: Wireframes e layouts das telas
- **LGPD_PRIVACY.md**: Política de privacidade e LGPD

## Fluxo de Dados

```
App (React Native)
    ↓
API Client (src/api/client.ts)
    ↓
Backend (Express)
    ↓
Database (PostgreSQL)
```

## Convenções de Código

- **Nomenclatura**: camelCase para variáveis/funções, PascalCase para componentes
- **Arquivos**: PascalCase para componentes, camelCase para utilitários
- **Imports**: Usar aliases (@components, @screens, etc.)
- **Comentários**: JSDoc para funções públicas

## Próximos Passos

1. Adicionar mais telas (Calendário, Treinos, Perfil)
2. Implementar Redux store
3. Adicionar testes E2E
4. Integrar modelo ML real
5. Deploy em produção

