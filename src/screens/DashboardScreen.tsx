import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

export default function DashboardScreen({ navigation }: any) {
  // Dados mockados — no real, traria do backend/sync/local storage
  const meta = { proteina: 90, fibra: 30, agua: 2500 };
  const registrado = { proteina: 60, fibra: 18, agua: 1500 };
  const proximaInjecao = "15/06/2024";
  const ultimosEfeitos = ["Sem enjoo", "Dor leve no braço"];
  const progressoTreino = "Treino 2/5 concluído";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumo diário</Text>
      <View style={styles.card}>
        <Text>
          Proteína: {registrado.proteina}g / {meta.proteina}g
        </Text>
        <Text>
          Fibra: {registrado.fibra}g / {meta.fibra}g
        </Text>
        <Text>
          Água: {registrado.agua}ml / {meta.agua}ml
        </Text>
      </View>
      <View style={styles.card}>
        <Text>Próxima injeção: {proximaInjecao}</Text>
      </View>
      <View style={styles.card}>
        <Text>Efeitos colaterais recentes:</Text>
        {ultimosEfeitos.map((e, i) => (
          <Text key={i} style={styles.sideeffect}>
            - {e}
          </Text>
        ))}
      </View>
      <View style={styles.card}>
        <Text>Progresso treino: {progressoTreino}</Text>
      </View>
      <Button
        title="Registrar agora"
        onPress={() => navigation.navigate("RegistroFoto")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    marginBottom: 14,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    elevation: 2,
  },
  sideeffect: { fontSize: 14, color: "#444" },
});
