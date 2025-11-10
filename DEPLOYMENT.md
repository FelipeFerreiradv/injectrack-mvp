# Guia de Deploy - InjecTrack

## Deploy do Frontend (Expo)

### 1. Build para Produção

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar projeto
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

### 2. Publicar no Expo Go (Desenvolvimento)

```bash
expo publish
```

### 3. Variáveis de Ambiente

Criar arquivo `.env.production`:
```env
API_BASE_URL=https://api.injectrack.com/api/v1
```

## Deploy do Backend

### Opção 1: Heroku

```bash
# Instalar Heroku CLI
heroku login

# Criar app
heroku create injectrack-api

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Configurar variáveis
heroku config:set JWT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set MERCADOPAGO_ACCESS_TOKEN=...

# Deploy
git push heroku main
```

### Opção 2: Render

1. Conectar repositório GitHub
2. Configurar build: `cd backend && npm install && npm run build`
3. Configurar start: `npm start`
4. Adicionar variáveis de ambiente no painel
5. Adicionar PostgreSQL no painel

### Opção 3: AWS (Elastic Beanstalk)

```bash
# Instalar EB CLI
pip install awsebcli

# Inicializar
eb init

# Criar ambiente
eb create injectrack-api

# Deploy
eb deploy
```

### Opção 4: Docker

```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build
docker build -t injectrack-backend ./backend

# Run
docker run -p 3000:3000 injectrack-backend
```

## Deploy do Banco de Dados

### PostgreSQL (Heroku/Render)

O banco é criado automaticamente ao adicionar o addon PostgreSQL.

### PostgreSQL (AWS RDS)

1. Criar instância RDS PostgreSQL
2. Configurar security groups
3. Executar migrations:
```bash
psql -h your-rds-endpoint -U postgres -d injectrack -f backend/database/schema.sql
```

## Configuração de Variáveis de Ambiente

### Backend (.env)

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/injectrack
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
MERCADOPAGO_ACCESS_TOKEN=...
MERCADOPAGO_PUBLIC_KEY=...
ML_API_URL=https://ml-api.injectrack.com
```

### Frontend (app.json)

```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://api.injectrack.com/api/v1"
    }
  }
}
```

## CI/CD (GitHub Actions)

### .github/workflows/deploy.yml

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install && npm run build
      - run: |
          # Deploy para Heroku/Render/AWS
```

## Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados criado e migrations executadas
- [ ] SSL/HTTPS configurado
- [ ] CORS configurado corretamente
- [ ] Logs configurados (Sentry, etc.)
- [ ] Monitoramento configurado
- [ ] Backup do banco configurado
- [ ] Testes de produção executados
- [ ] Documentação atualizada

## Monitoramento

### Sentry (Erros)

```bash
npm install @sentry/react-native
```

### Analytics

- Google Analytics
- Firebase Analytics
- Mixpanel

## Segurança

- [ ] HTTPS configurado
- [ ] CORS configurado
- [ ] Rate limiting configurado
- [ ] Validação de inputs
- [ ] Sanitização de dados
- [ ] Criptografia de dados sensíveis
- [ ] Logs de segurança

