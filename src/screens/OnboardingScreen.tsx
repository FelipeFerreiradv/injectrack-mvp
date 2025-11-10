/**
 * Tela de Onboarding - Coleta informações iniciais do usuário
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { COLORS, SPACING, TYPOGRAPHY } from '../utils/constants';
import { OnboardingData, Sex, MedicationType, WorkoutGoal, WorkoutLevel } from '../types';
// Picker será implementado com componente nativo ou biblioteca

interface OnboardingScreenProps {
  navigation: any;
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    sex: 'female',
    medications: [],
    goal: 'glute_growth',
    level: 'beginner',
    notificationsEnabled: true,
    privacyConsent: false,
  });

  const updateField = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Validação final antes de completar
      if (validateForm()) {
        onComplete(formData as OnboardingData);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const validateForm = (): boolean => {
    return !!(
      formData.name &&
      formData.email &&
      formData.password &&
      formData.birthdate &&
      formData.height &&
      formData.weight &&
      formData.privacyConsent
    );
  };

  const renderStep1 = () => (
    <View>
      <Text style={styles.title}>Bem-vindo ao InjecTrack</Text>
      <Text style={styles.subtitle}>
        Vamos começar coletando algumas informações básicas
      </Text>
      <Input
        label="Nome completo"
        placeholder="Digite seu nome"
        value={formData.name}
        onChangeText={(text) => updateField('name', text)}
        autoCapitalize="words"
      />
      <Input
        label="E-mail"
        placeholder="seu@email.com"
        value={formData.email}
        onChangeText={(text) => updateField('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Senha"
        placeholder="Mínimo 6 caracteres"
        value={formData.password}
        onChangeText={(text) => updateField('password', text)}
        secureTextEntry
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.title}>Informações pessoais</Text>
      <Text style={styles.subtitle}>
        Essas informações ajudam a personalizar seu acompanhamento
      </Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Sexo</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioOption, formData.sex === 'female' && styles.radioSelected]}
            onPress={() => updateField('sex', 'female')}
          >
            <Text style={[styles.radioText, formData.sex === 'female' && styles.radioTextSelected]}>
              Feminino
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioOption, formData.sex === 'male' && styles.radioSelected]}
            onPress={() => updateField('sex', 'male')}
          >
            <Text style={[styles.radioText, formData.sex === 'male' && styles.radioTextSelected]}>
              Masculino
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioOption, formData.sex === 'other' && styles.radioSelected]}
            onPress={() => updateField('sex', 'other')}
          >
            <Text style={[styles.radioText, formData.sex === 'other' && styles.radioTextSelected]}>
              Outro
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Input
        label="Data de nascimento"
        placeholder="DD/MM/AAAA"
        value={formData.birthdate}
        onChangeText={(text) => updateField('birthdate', text)}
      />
      <Input
        label="Altura (cm)"
        placeholder="Ex: 170"
        value={formData.height?.toString()}
        onChangeText={(text) => updateField('height', parseFloat(text) || 0)}
        keyboardType="numeric"
      />
      <Input
        label="Peso (kg)"
        placeholder="Ex: 70"
        value={formData.weight?.toString()}
        onChangeText={(text) => updateField('weight', parseFloat(text) || 0)}
        keyboardType="numeric"
      />
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.title}>Objetivos e medicação</Text>
      <Text style={styles.subtitle}>
        Conte-nos sobre seus objetivos de treino e medicação
      </Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Objetivo de treino</Text>
        <View style={styles.radioGroup}>
          {['glute_growth', 'weight_loss', 'muscle_gain', 'endurance', 'general'].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[styles.radioOption, formData.goal === goal && styles.radioSelected]}
              onPress={() => updateField('goal', goal)}
            >
              <Text style={[styles.radioText, formData.goal === goal && styles.radioTextSelected]}>
                {goal === 'glute_growth' ? 'Crescimento de glúteo' :
                 goal === 'weight_loss' ? 'Perda de peso' :
                 goal === 'muscle_gain' ? 'Ganho de massa' :
                 goal === 'endurance' ? 'Resistência' : 'Geral'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Nível de treino</Text>
        <View style={styles.radioGroup}>
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.radioOption, formData.level === level && styles.radioSelected]}
              onPress={() => updateField('level', level)}
            >
              <Text style={[styles.radioText, formData.level === level && styles.radioTextSelected]}>
                {level === 'beginner' ? 'Iniciante' :
                 level === 'intermediate' ? 'Intermediário' : 'Avançado'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Medicação atual</Text>
        <View style={styles.radioGroup}>
          {['none', 'ozempic', 'anabolic', 'both'].map((med) => (
            <TouchableOpacity
              key={med}
              style={[styles.radioOption, formData.medications?.[0] === med && styles.radioSelected]}
              onPress={() => updateField('medications', [med])}
            >
              <Text style={[styles.radioText, formData.medications?.[0] === med && styles.radioTextSelected]}>
                {med === 'none' ? 'Nenhuma' :
                 med === 'ozempic' ? 'Ozempic/Semaglutida' :
                 med === 'anabolic' ? 'Anabolizantes' : 'Ambos'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View>
      <Text style={styles.title}>Privacidade e notificações</Text>
      <Text style={styles.subtitle}>
        Configure suas preferências de privacidade e notificações
      </Text>
      <Card style={styles.consentCard}>
        <Text style={styles.consentTitle}>Consentimento de Privacidade (LGPD)</Text>
        <Text style={styles.consentText}>
          Ao continuar, você concorda com nossa Política de Privacidade e termos de uso.
          Seus dados serão tratados de acordo com a LGPD e usados apenas para melhorar
          sua experiência no aplicativo.
        </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            Eu concordo com os termos de privacidade
          </Text>
          <Switch
            value={formData.privacyConsent || false}
            onValueChange={(value) => updateField('privacyConsent', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </Card>
      <Card style={styles.consentCard}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            Ativar notificações para lembretes
          </Text>
          <Switch
            value={formData.notificationsEnabled || false}
            onValueChange={(value) => updateField('notificationsEnabled', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </Card>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]}
          />
        </View>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <Button
              title="Voltar"
              onPress={handleBack}
              variant="outline"
              style={styles.backButton}
            />
          )}
          <Button
            title={step === 4 ? 'Finalizar' : 'Continuar'}
            onPress={handleNext}
            disabled={step === 4 && !formData.privacyConsent}
            style={styles.nextButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: SPACING.xl,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  pickerContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  radioOption: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    minWidth: 100,
    margin: SPACING.xs,
  },
  radioSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  radioText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    textAlign: 'center',
  },
  radioTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  consentCard: {
    marginBottom: SPACING.md,
  },
  consentTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  consentText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  switchLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});

