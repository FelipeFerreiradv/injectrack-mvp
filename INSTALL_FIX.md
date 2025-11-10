# Correção de Erros de Instalação

## Problema Identificado

O erro ocorreu devido a conflito de versões entre:
- `react@18.2.0` (instalado)
- `react-test-renderer@19.2.0` (requerido por @testing-library/react-native)
- `react-test-renderer@19.2.0` requer `react@^19.2.0`

## Correções Aplicadas

1. **Adicionado `react-test-renderer@18.2.0`** explicitamente nas devDependencies para compatibilidade com React 18
2. **Adicionado `jest-expo`** para compatibilidade com Expo SDK 50
3. **Adicionado `react-dom@18.2.0`** para compatibilidade
4. **Adicionado `babel-plugin-module-resolver`** que estava sendo usado mas não estava nas dependências
5. **Atualizado `jest.config.js`** para usar `preset: 'jest-expo'` ao invés de `'react-native'`

## Como Instalar Agora

Execute o comando com `--legacy-peer-deps` para evitar conflitos de peer dependencies:

```bash
npm install --legacy-peer-deps
```

Ou, se preferir usar yarn:

```bash
yarn install
```

## Verificação

Após a instalação, verifique se tudo está funcionando:

```bash
# Verificar se as dependências foram instaladas
npm list --depth=0

# Testar o app
npm start
```

## Notas

- O uso de `--legacy-peer-deps` é necessário porque algumas bibliotecas ainda não foram atualizadas para React 19
- O `react-test-renderer@18.2.0` é compatível com React 18.2.0 e funciona corretamente com @testing-library/react-native
- O `jest-expo` é o preset recomendado para projetos Expo

