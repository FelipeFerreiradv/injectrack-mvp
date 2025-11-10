# InjecTrack - MVP

Aplicativo móvel para acompanhamento de medicamentos injetáveis (Ozempic/semaglutida, anabolizantes) com detecção de injeção por foto usando Machine Learning.

## 🎯 Objetivo

MVP de aplicativo que permite:
- Acompanhar ingestão diária de proteínas, fibras e água
- Registrar e monitorar efeitos colaterais
- Marcar dias de injeção automaticamente a partir de foto (ML)
- Planejamento de treinos personalizados
- Assinatura mensal (R$ 20/mês)

## 🚀 Tecnologias

### Frontend
- **React Native** + **TypeScript** + **Expo**
- **React Navigation** (Stack + Tabs)
- **Redux Toolkit** (gerenciamento de estado)
- **Formik + Yup** (formulários e validação)
- **Expo Camera** (câmera)
- **Expo Image Picker** (galeria)
- **Expo Secure Store** (armazenamento seguro)

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** (banco de dados)
- **Swagger/OpenAPI** (documentação)
- **JWT** (autenticação)

### ML
- **TensorFlow Lite** (modelo mobile)
- **TensorFlow** (treinamento)

### Pagamentos
- **Stripe** (cartões)
- **Mercado Pago** (Brasil)

## 📁 Estrutura do Projeto

```
injectrack-mvp/
├── src/                    # Frontend React Native
│   ├── components/         # Componentes reutilizáveis
│   ├── screens/            # Telas do app
│   ├── navigation/         # Configuração de navegação
│   ├── api/                # Cliente API
│   ├── store/              # Redux store
│   ├── utils/              # Utilitários
│   ├── types/              # TypeScript types
│   └── __tests__/          # Testes unitários
├── backend/                # Backend Node.js
│   ├── src/
│   │   ├── routes/         # Rotas da API
│   │   └── index.ts        # Servidor Express
│   └── database/
│       └── schema.sql      # Esquema do banco
├── docs/                   # Documentação
│   ├── ML_MODEL_SPEC.md    # Especificação do modelo ML
│   ├── WIREFRAMES.md       # Wireframes
│   └── LGPD_PRIVACY.md     # Política de privacidade
└── README.md
```

## 🛠️ Setup Local

### Pré-requisitos

- Node.js 18+ e npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL 14+ (para backend)
- Android Studio / Xcode (para emuladores)

### 1. Instalar Dependências

```bash
# Frontend (use --legacy-peer-deps para evitar conflitos de versão)
npm install --legacy-peer-deps

# Backend
cd backend
npm install
```

**Nota**: O uso de `--legacy-peer-deps` é necessário devido a conflitos de versão entre React 18 e algumas dependências de teste. Alternativamente, você pode usar `yarn` que resolve melhor esses conflitos.

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# API
API_BASE_URL=http://localhost:3000/api/v1

# Backend
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/injectrack
JWT_SECRET=your_jwt_secret_here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=TEST-...

# ML (opcional para MVP)
ML_API_URL=http://localhost:8000
```

Crie um arquivo `.env` no backend:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/injectrack
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=sk_test_...
MERCADOPAGO_ACCESS_TOKEN=TEST-...
```

### 3. Configurar Banco de Dados

```bash
# Criar banco
createdb injectrack

# Executar migrations
psql -d injectrack -f backend/database/schema.sql
```

### 4. Iniciar Servidor Backend

```bash
cd backend
npm run dev
```

O servidor estará disponível em `http://localhost:3000`
Documentação Swagger em `http://localhost:3000/api-docs`

### 5. Iniciar App Mobile

```bash
# Na raiz do projeto
npm start

# Ou para plataforma específica
npm run android
npm run ios
npm run web
```

## 📱 Telas Principais

### 1. Onboarding (3-5 telas)
- Coleta de informações básicas
- Consentimento LGPD
- Configuração de notificações

### 2. Preview/Teaser
- Cards com principais benefícios
- Botão para assinatura

### 3. Assinatura
- Preço R$ 20/mês
- Integração Stripe + Mercado Pago

### 4. Dashboard
- Resumo do dia
- Metas de proteínas/fibras/água
- Próxima injeção
- Progresso do treino

### 5. Registro de Injeção
- Tirar foto ou escolher da galeria
- Análise automática por ML
- Confirmação manual (fallback)
- Notas opcionais

## 🔌 Endpoints da API

### ML - Análise de Foto
```
POST /api/v1/analyze-photo
Content-Type: multipart/form-data
Body: { photo: File }

Response:
{
  "injection_detected": true,
  "confidence": 0.85,
  "bbox": [10, 10, 200, 200],
  "suggested_tag": "abdomen"
}
```

### Injeções
```
POST /api/v1/injections
GET /api/v1/injections?startDate=...&endDate=...
```

### Logs Diários
```
POST /api/v1/daily-logs
GET /api/v1/daily-logs?startDate=...&endDate=...
```

### Assinatura
```
POST /api/v1/subscription/create
GET /api/v1/subscription/status
POST /api/v1/subscription/webhook
```

### Usuário
```
GET /api/v1/user/profile
PUT /api/v1/user/profile
```

Ver documentação completa em `http://localhost:3000/api-docs`

## 🤖 Modelo de ML

### Especificação
- **Input**: Imagem 224x224 RGB
- **Output**: `{ injection_detected: boolean, confidence: number, ... }`
- **Threshold**: 0.7 (70%)
- **Framework**: TensorFlow Lite (on-device)

Ver documentação completa em `docs/ML_MODEL_SPEC.md`

### Pipeline de Treinamento
1. Coleta de dataset (1000-5000 imagens rotuladas)
2. Augmentação de dados
3. Treinamento com TensorFlow
4. Conversão para TensorFlow Lite
5. Deploy no app

## 🧪 Testes

```bash
# Testes unitários
npm test

# Testes com watch
npm run test:watch
```

### Casos de Aceitação

1. **Análise de Foto**: Ao enviar foto válida → modelo responde `detected = true` com `confidence >= 0.7` → app marca dia de injeção
2. **Registro Offline**: App funciona offline e sincroniza quando conecta
3. **Assinatura**: Fluxo de checkout simulado funciona corretamente

## 🔒 Segurança e Privacidade

- Dados sensíveis criptografados (em repouso e em trânsito)
- Autenticação JWT + refresh tokens
- Conformidade com LGPD
- Política de privacidade em `docs/LGPD_PRIVACY.md`

## 📊 Banco de Dados

Esquema simplificado:
- `users` - Usuários
- `profiles` - Perfis e objetivos
- `injections` - Registros de injeção
- `daily_logs` - Logs diários
- `workouts` - Treinos
- `subscriptions` - Assinaturas

Ver `backend/database/schema.sql` para detalhes.

## 🚢 Deploy

### Frontend (Expo)
```bash
# Build para produção
expo build:android
expo build:ios

# Ou usar EAS Build
eas build --platform android
eas build --platform ios
```

### Backend
- **Heroku**: `git push heroku main`
- **Render**: Conectar repositório
- **AWS**: Usar Elastic Beanstalk ou ECS

### Variáveis de Ambiente (Produção)
- Configurar todas as variáveis no painel do provedor
- Usar secrets management (AWS Secrets Manager, etc.)

## 📝 Próximos Passos (Pós-MVP)

1. **Modelo ML Real**:
   - Coletar dataset real (1000-5000 imagens)
   - Treinar modelo com dados reais
   - Testes de precisão/recall

2. **Integração de Pagamento**:
   - Integrar Stripe ao vivo
   - Integrar Mercado Pago ao vivo
   - Testes de webhook

3. **Revisão Legal**:
   - Revisar política de privacidade com advogado
   - Garantir conformidade total com LGPD

4. **Testes em Dispositivos Reais**:
   - Testes em diferentes dispositivos Android/iOS
   - Testes de performance
   - Testes de usabilidade

5. **Melhorias**:
   - Notificações push
   - Exportação de relatórios (CSV/PDF)
   - Sincronização offline melhorada
   - Analytics e métricas

## 📄 Licença

MIT

## 👥 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Nota**: Este é um MVP. Para produção, é necessário:
- Treinar modelo ML com dataset real
- Integrar gateways de pagamento ao vivo
- Revisar legalmente a política de privacidade
- Testes extensivos em dispositivos reais

