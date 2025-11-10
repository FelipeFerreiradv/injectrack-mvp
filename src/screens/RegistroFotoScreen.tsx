import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
// import * as ImagePicker from 'expo-image-picker'
import { mockAnalyzePhoto } from "../api/photo";

export default function RegistroFotoScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [resultado, setResultado] = useState<any>(null);

  // Simulação de upload e análise de foto
  const handleFoto = async () => {
    // Aqui usaria o expo-image-picker para capturar a imagem
    // const result = await ImagePicker.launchCameraAsync({ ... })
    // if (result.cancelled) return;
    // setPhoto(result.uri)

    // Simulação: Foto base64 fake
    setPhoto("data:image/jpeg;base64,teste123");

    // Chamada de endpoint mock
    const res = await mockAnalyzePhoto("data:image/jpeg;base64,teste123");
    setResultado(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Injeção</Text>
      <Button title="Tirar/Enviar Foto" onPress={handleFoto} />

      {photo && (
        <View style={{ marginVertical: 14 }}>
          <Text>Foto enviada:</Text>
          {/* <Image source={{ uri: photo }} style={{ width: 160, height: 160 }} /> */}
          <Text>[miniatura simulada]</Text>
        </View>
      )}
      {resultado && (
        <View style={styles.analysis}>
          <Text>
            Injeção detectada? {resultado.injection_detected ? "Sim" : "Não"}
          </Text>
          <Text>Confiança: {resultado.confidence}</Text>
          <Text>Região sugerida: {resultado.suggested_tag}</Text>
          <Button
            title="Confirmar Registro"
            onPress={() => Alert.alert("Dia marcado!")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  analysis: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#e0f0ea",
    borderRadius: 8,
  },
});
