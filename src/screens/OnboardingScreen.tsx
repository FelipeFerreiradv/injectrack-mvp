import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";

const OnboardingScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    idade: "",
    sexo: "",
    peso: "",
    altura: "",
    objetivo: "",
    medicacao: "",
  });

  // Avança etapas
  const nextStep = () => setStep((s) => s + 1);

  // Envia dados finais e segue pro preview
  const handleFinish = () => {
    // Poderia chamar um endpoint aqui
    navigation.navigate("Preview");
  };

  return (
    <View style={styles.container}>
      {step === 0 && (
        <>
          <Text style={styles.label}>Seu nome</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.idade}
            onChangeText={(v) => setForm({ ...form, idade: v })}
          />
          <Button title="Próximo" onPress={nextStep} />
        </>
      )}
      {step === 1 && (
        <>
          <Text style={styles.label}>Sexo</Text>
          <TextInput
            style={styles.input}
            value={form.sexo}
            onChangeText={(v) => setForm({ ...form, sexo: v })}
          />
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.peso}
            onChangeText={(v) => setForm({ ...form, peso: v })}
          />
          <Text style={styles.label}>Altura (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.altura}
            onChangeText={(v) => setForm({ ...form, altura: v })}
          />
          <Button title="Próximo" onPress={nextStep} />
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.label}>Objetivo do treino</Text>
          <TextInput
            style={styles.input}
            value={form.objetivo}
            onChangeText={(v) => setForm({ ...form, objetivo: v })}
          />
          <Text style={styles.label}>Uso de medicamento</Text>
          <TextInput
            style={styles.input}
            value={form.medicacao}
            placeholder="Ozempic, anabolizante, ambos"
            onChangeText={(v) => setForm({ ...form, medicacao: v })}
          />
          <Button title="Próximo" onPress={nextStep} />
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.label}>
            Você aceita os termos de privacidade (LGPD)?
          </Text>
          <TouchableOpacity onPress={handleFinish}>
            <Text style={styles.button}>Aceito e Continuar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  label: { fontSize: 18, marginVertical: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    textAlign: "center",
    borderRadius: 6,
  },
});

export default OnboardingScreen;
