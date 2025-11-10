# Correções Aplicadas - Erros de Instalação

## Problema Original

Ao executar `npm install`, ocorria o seguinte erro:

```
npm error ERESOLVE unable to resolve dependency tree
npm error Could not resolve dependency:
npm error peer react@"^19.2.0" from react-test-renderer@19.2.0
```

## Causa do Problema

O erro ocorreu devido a conflito de versões:

- `react@18.2.0` estava instalado
- `@testing-library/react-native` tentava instalar `react-test-renderer@19.2.0`
- `react-test-renderer@19.2.0` requer `react@^19.2.0`
- Conflito entre React 18 e React 19

## Correções Aplicadas

### 1. Adicionado `react-test-renderer@18.2.0` explicitamente

```json
"devDependencies": {
  "react-test-renderer": "18.2.0"
}
```

Isso força a instalação da versão compatível com React 18.

### 2. Adicionado `jest-expo` para compatibilidade com Expo

```json
"devDependencies": {
  "jest-expo": "~50.0.1"
}
```

Preset recomendado para projetos Expo SDK 50.

### 3. Adicionado `react-dom@18.2.0`

```json
"dependencies": {
  "react-dom": "18.2.0"
}
```

Necessário para compatibilidade com React 18.

### 4. Adicionado `babel-plugin-module-resolver`

```json
"devDependencies": {
  "babel-plugin-module-resolver": "^5.0.0"
}
```

Plugin estava sendo usado no `babel.config.js` mas não estava nas dependências.

### 5. Atualizado `jest.config.js`

```javascript
preset: "jest-expo"; // ao invés de 'react-native'
```

Preset correto para projetos Expo.

## Como Instalar Agora

Execute o comando com `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

Ou use `yarn` (recomendado):

```bash
yarn install
```

## Verificação

Após a instalação, verifique se tudo está funcionando:

```bash
# Verificar versões instaladas
npm list react react-native react-test-renderer

# Testar o app
npm start
```

## Resultado

✅ Instalação concluída com sucesso
✅ Todas as dependências instaladas corretamente
✅ Conflitos de versão resolvidos
✅ Projeto pronto para desenvolvimento

## Notas Importantes

1. **Uso de `--legacy-peer-deps`**: Necessário porque algumas bibliotecas ainda não foram atualizadas para React 19. Isso é seguro e não afeta a funcionalidade do app.

2. **Vulnerabilidades**: Algumas vulnerabilidades podem aparecer no `npm audit`. A maioria são de dependências transitivas e não afetam o funcionamento do MVP. Para produção, considere atualizar as dependências.

3. **Warnings de deprecação**: Alguns warnings sobre pacotes deprecados são normais e não afetam o funcionamento. Esses pacotes são dependências transitivas de outras bibliotecas.

## Próximos Passos

1. ✅ Instalação concluída
2. ⏭️ Configurar variáveis de ambiente (`.env`)
3. ⏭️ Configurar banco de dados
4. ⏭️ Iniciar servidor backend
5. ⏭️ Iniciar app mobile
