# Especificação do Modelo de ML - Detecção de Injeção

## Visão Geral

O modelo de Machine Learning é responsável por analisar fotos e detectar se há evidência de injeção na imagem, classificando como "injetou" ou "não injetou" (classificação binária).

## Especificações Técnicas

### Input
- **Tipo**: Imagem (JPEG/PNG)
- **Tamanho**: 224x224 pixels (redimensionado)
- **Canais**: RGB (3 canais)
- **Normalização**: Valores normalizados entre 0 e 1

### Output
```json
{
  "injection_detected": boolean,
  "confidence": number (0.0 a 1.0),
  "bbox": [x, y, width, height] (opcional),
  "suggested_tag": "abdomen" | "arm" | "thigh" | "other" (opcional),
  "metadata": {
    "syringe_type": string (opcional),
    "ampoule_type": string (opcional)
  }
}
```

### Threshold
- **Confiança mínima**: 0.7 (70%)
- Se `confidence >= 0.7` e `injection_detected = true`: confirmação automática
- Se `confidence < 0.7`: requer confirmação manual do usuário

## Arquitetura do Modelo (Sugestão)

### Opção 1: MobileNetV2 (Recomendado para MVP)
- **Framework**: TensorFlow Lite
- **Tamanho do modelo**: ~8-10 MB
- **Inferência**: On-device (privacidade)
- **Latência**: ~100-200ms em dispositivos modernos

### Opção 2: Custom CNN
- **Camadas**: Conv2D → MaxPooling → Conv2D → MaxPooling → Dense → Dense
- **Ativação**: ReLU (camadas ocultas), Sigmoid (saída)
- **Dropout**: 0.5 para regularização

## Pipeline de Treinamento

### Dataset
1. **Coleta de dados**:
   - Fotos de áreas de injeção (abdômen, braço, coxa)
   - Fotos de ampolas/seringas
   - Fotos sem injeção (negativas)

2. **Rotulagem**:
   - Classe 0: Não injetou
   - Classe 1: Injetou
   - Tags adicionais: localização (abdomen/arm/thigh)

3. **Augmentação**:
   - Rotação (±15°)
   - Brilho/contraste
   - Zoom (0.9-1.1x)
   - Flip horizontal

### Treinamento
```python
# Exemplo de pipeline (Python/TensorFlow)
import tensorflow as tf
from tensorflow import keras

# Carregar e preparar dados
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'data/train',
    image_size=(224, 224),
    batch_size=32
)

# Criar modelo
model = keras.Sequential([
    keras.layers.Rescaling(1./255),
    keras.layers.Conv2D(32, 3, activation='relu'),
    keras.layers.MaxPooling2D(),
    keras.layers.Conv2D(64, 3, activation='relu'),
    keras.layers.MaxPooling2D(),
    keras.layers.Flatten(),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(1, activation='sigmoid')
])

# Compilar
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Treinar
model.fit(train_ds, epochs=10)

# Converter para TensorFlow Lite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Salvar
with open('injection_detector.tflite', 'wb') as f:
    f.write(tflite_model)
```

## Endpoint da API

### POST `/api/v1/analyze-photo`

**Request**:
- Content-Type: `multipart/form-data`
- Campo: `photo` (arquivo de imagem)

**Response** (200 OK):
```json
{
  "injection_detected": true,
  "confidence": 0.85,
  "bbox": [50, 100, 150, 150],
  "suggested_tag": "abdomen",
  "metadata": {
    "syringe_type": "insulin",
    "ampoule_type": "semaglutide"
  }
}
```

**Response** (400 Bad Request):
```json
{
  "error": "Foto não fornecida"
}
```

**Response** (500 Internal Server Error):
```json
{
  "error": "Erro ao processar foto"
}
```

## Implementação no App

### React Native (Exemplo)
```typescript
import * as ImagePicker from 'expo-image-picker';
import { apiClient } from '../api/client';

const analyzePhoto = async (photoUri: string) => {
  const formData = new FormData();
  formData.append('photo', {
    uri: photoUri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  } as any);

  const response = await apiClient.analyzePhoto(photoUri);
  
  if (response.injection_detected && response.confidence >= 0.7) {
    // Confirmar automaticamente
    return response;
  } else {
    // Requerer confirmação manual
    return response;
  }
};
```

## Próximos Passos para Produção

1. **Coleta de dataset real**:
   - Coletar pelo menos 1000-5000 imagens rotuladas
   - Garantir diversidade (diferentes tipos de pele, locais, iluminação)

2. **Treinamento do modelo**:
   - Treinar com dataset real
   - Validação cruzada
   - Ajuste de hiperparâmetros

3. **Otimização**:
   - Quantização do modelo (reduzir tamanho)
   - Pruning (remover neurônios desnecessários)

4. **Testes**:
   - Testes de precisão/recall
   - Testes em dispositivos reais
   - Testes de latência

5. **Monitoramento**:
   - Logs de confiança
   - Feedback dos usuários (correções)
   - Retreinamento periódico

