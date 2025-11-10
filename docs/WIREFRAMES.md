# Wireframes do InjecTrack

## Estrutura de Navegação

```
App
├── Onboarding (3-5 telas)
│   ├── Tela 1: Boas-vindas + Nome/Email/Senha
│   ├── Tela 2: Informações pessoais (Sexo, Data nascimento, Altura, Peso)
│   ├── Tela 3: Objetivos (Objetivo treino, Nível, Medicação)
│   └── Tela 4: Privacidade (Consentimento LGPD, Notificações)
├── Preview/Teaser (1 tela)
│   └── Cards com benefícios + Botão "Continuar"
├── Assinatura (1 tela)
│   └── Preço R$20/mês + Botão pagar
└── Principal (Tab Navigation)
    ├── Dashboard
    ├── Registro
    ├── Calendário
    ├── Treinos
    └── Perfil
```

## Wireframe 1: Onboarding - Tela 1

```
┌─────────────────────────────────┐
│ [Progress: ████░░░░░░] 40%     │
├─────────────────────────────────┤
│                                 │
│  Bem-vindo ao InjecTrack        │
│                                 │
│  Vamos começar coletando        │
│  algumas informações básicas    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Nome completo            │  │
│  │ [_____________________]   │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ E-mail                   │  │
│  │ [_____________________]   │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Senha                    │  │
│  │ [_____________________]   │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌──────────┐  ┌─────────────┐ │
│  │  Voltar  │  │  Continuar  │ │
│  └──────────┘  └─────────────┘ │
└─────────────────────────────────┘
```

## Wireframe 2: Dashboard

```
┌─────────────────────────────────┐
│ Dashboard                       │
│ Segunda, 15 de janeiro          │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Registro rápido            │ │
│ │                            │ │
│ │  [Registrar injeção]       │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Acompanhamento de hoje     │ │
│ │                            │ │
│ │ Proteínas (g)              │ │
│ │ ████████░░ 45 / 120        │ │
│ │                            │ │
│ │ Fibras (g)                 │ │
│ │ ████░░░░░░ 12 / 25         │ │
│ │                            │ │
│ │ Água (ml)                  │ │
│ │ █████░░░░░ 1200 / 2500     │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Próxima injeção            │ │
│ │                            │ │
│ │ Em 3 dia(s)                │ │
│ │ 18/01/2024                 │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Treino da semana           │ │
│ │                            │ │
│ │ Semana 1 - Dia 3          │ │
│ │ [Iniciar treino]           │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## Wireframe 3: Registro de Injeção

```
┌─────────────────────────────────┐
│ ← Registrar injeção             │
├─────────────────────────────────┤
│                                 │
│ Tire uma foto da área da        │
│ injeção ou da ampola/seringa    │
│                                 │
│ ┌─────────────────────────────┐ │
│ │                            │ │
│ │                            │ │
│ │    [Área da foto]          │ │
│ │                            │ │
│ │                            │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌──────────┐  ┌──────────────┐  │
│ │Tirar foto│  │Escolher foto │  │
│ └──────────┘  └──────────────┘  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Resultado da análise       │ │
│ │                            │ │
│ │ Injeção detectada: Sim     │ │
│ │ Confiança: 85%             │ │
│ │ Local sugerido: abdomen   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Notas (opcional)           │ │
│ │ [_______________________]  │ │
│ │ [_______________________]  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Data da injeção            │ │
│ │ 15/01/2024 às 14:30        │ │
│ └─────────────────────────────┘ │
│                                 │
│    [Registrar injeção]          │
└─────────────────────────────────┘
```

## Wireframe 4: Preview/Teaser

```
┌─────────────────────────────────┐
│                                 │
│     InjecTrack                  │
│                                 │
│  Veja o que você vai ganhar:   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📊 Relatórios semanais     │ │
│ │                            │ │
│ │ Acompanhe seu progresso   │ │
│ │ com relatórios detalhados  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📷 Detecção por foto       │ │
│ │                            │ │
│ │ Registre injeções          │ │
│ │ automaticamente com IA    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 💪 Plano de treino         │ │
│ │                            │ │
│ │ Treinos personalizados     │ │
│ │ para seus objetivos        │ │
│ └─────────────────────────────┘ │
│                                 │
│  Versão gratuita: 7 dias       │
│  Assinatura: R$ 20/mês         │
│                                 │
│    [Continuar → Assinatura]     │
└─────────────────────────────────┘
```

## Wireframe 5: Assinatura

```
┌─────────────────────────────────┐
│ ← Assinatura                    │
├─────────────────────────────────┤
│                                 │
│  Assine o InjecTrack            │
│                                 │
│ ┌─────────────────────────────┐ │
│ │                            │ │
│ │  Plano Mensal               │ │
│ │                            │ │
│ │  R$ 20,00 / mês            │ │
│ │                            │ │
│ │  ✓ Registro ilimitado      │ │
│ │  ✓ Detecção por foto       │ │
│ │  ✓ Relatórios completos    │ │
│ │  ✓ Planos de treino        │ │
│ │  ✓ Suporte prioritário     │ │
│ │                            │ │
│ │  Teste grátis: 7 dias      │ │
│ └─────────────────────────────┘ │
│                                 │
│  Forma de pagamento:            │
│  ┌─────────────────────────────┐ │
│  │ [ ] Cartão de crédito      │ │
│  │ [ ] Mercado Pago           │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ [Pagar R$ 20,00]          │ │
│  └─────────────────────────────┘ │
│                                 │
│  Ao continuar, você concorda    │
│  com nossos termos de uso       │
└─────────────────────────────────┘
```

## JSON para Geração Automática de UI

```json
{
  "screens": [
    {
      "name": "OnboardingStep1",
      "components": [
        {
          "type": "ProgressBar",
          "progress": 0.4
        },
        {
          "type": "Text",
          "text": "Bem-vindo ao InjecTrack",
          "style": "h1"
        },
        {
          "type": "Input",
          "label": "Nome completo",
          "placeholder": "Digite seu nome"
        },
        {
          "type": "Input",
          "label": "E-mail",
          "placeholder": "seu@email.com",
          "keyboardType": "email"
        },
        {
          "type": "Input",
          "label": "Senha",
          "placeholder": "Mínimo 6 caracteres",
          "secureTextEntry": true
        },
        {
          "type": "Button",
          "title": "Continuar",
          "action": "next"
        }
      ]
    }
  ]
}
```

