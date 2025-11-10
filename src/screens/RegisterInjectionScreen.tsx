/**
 * Tela de Registro de Injeção - Permite tirar foto e registrar injeção
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
// Camera será usado via ImagePicker
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { COLORS, SPACING, TYPOGRAPHY, ML_CONFIDENCE_THRESHOLD } from '../utils/constants';
import { apiClient } from '../api/client';
import { PhotoAnalysisResponse } from '../types';
import { format } from 'date-fns';

interface RegisterInjectionScreenProps {
  navigation: any;
}

export const RegisterInjectionScreen: React.FC<RegisterInjectionScreenProps> = ({
  navigation,
}) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PhotoAnalysisResponse | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0].uri);
        analyzePhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto');
      console.error(error);
    }
  };

  const pickPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0].uri);
        analyzePhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a foto');
      console.error(error);
    }
  };

  const analyzePhoto = async (photoUri: string) => {
    try {
      setAnalyzing(true);
      setAnalysisResult(null);

      // Chamada à API de análise
      const result = await apiClient.analyzePhoto(photoUri);
      setAnalysisResult(result);

      if (result.injection_detected && result.confidence >= ML_CONFIDENCE_THRESHOLD) {
        Alert.alert(
          'Injeção detectada!',
          `Detectamos uma injeção com ${Math.round(result.confidence * 100)}% de confiança.`
        );
      } else if (result.injection_detected) {
        Alert.alert(
          'Confiança baixa',
          'Detectamos uma possível injeção, mas com baixa confiança. Por favor, confirme manualmente.'
        );
      } else {
        Alert.alert(
          'Nenhuma injeção detectada',
          'Não foi possível detectar uma injeção na foto. Você pode registrar manualmente.'
        );
      }
    } catch (error) {
      console.error('Erro ao analisar foto:', error);
      Alert.alert(
        'Erro na análise',
        'Não foi possível analisar a foto. Você pode registrar manualmente.'
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const saveInjection = async () => {
    if (!photo && !analysisResult?.injection_detected) {
      Alert.alert('Atenção', 'Por favor, tire uma foto ou confirme manualmente');
      return;
    }

    try {
      setSaving(true);

      const injectionData = {
        date: new Date().toISOString(),
        photoUrl: photo || undefined,
        detected: analysisResult?.injection_detected || false,
        confidence: analysisResult?.confidence,
        location: analysisResult?.suggested_tag || 'other',
        notes: notes || undefined,
      };

      await apiClient.registerInjection(injectionData);

      Alert.alert('Sucesso', 'Injeção registrada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Erro ao salvar injeção:', error);
      Alert.alert('Erro', 'Não foi possível registrar a injeção');
    } finally {
      setSaving(false);
    }
  };

  const confirmManual = () => {
    setAnalysisResult({
      injection_detected: true,
      confidence: 1.0,
      suggested_tag: 'other',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Registrar injeção</Text>
      <Text style={styles.subtitle}>
        Tire uma foto da área da injeção ou da ampola/seringa
      </Text>

      {/* Área de foto */}
      <Card style={styles.photoCard}>
        {photo ? (
          <View>
            <Image source={{ uri: photo }} style={styles.photo} />
            {analyzing && (
              <View style={styles.analyzingOverlay}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.analyzingText}>Analisando foto...</Text>
              </View>
            )}
            <Button
              title="Tirar outra foto"
              onPress={takePhoto}
              variant="outline"
              style={styles.photoButton}
            />
          </View>
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>
              Nenhuma foto selecionada
            </Text>
            <View style={styles.photoButtons}>
              <Button
                title="Tirar foto"
                onPress={takePhoto}
                disabled={hasPermission === false}
                style={styles.photoButton}
              />
              <Button
                title="Escolher da galeria"
                onPress={pickPhoto}
                variant="outline"
                style={styles.photoButton}
              />
            </View>
            {hasPermission === false && (
              <Text style={styles.permissionText}>
                Permissão de câmera negada. Ative nas configurações.
              </Text>
            )}
          </View>
        )}
      </Card>

      {/* Resultado da análise */}
      {analysisResult && (
        <Card style={styles.analysisCard}>
          <Text style={styles.cardTitle}>Resultado da análise</Text>
          <View style={styles.analysisRow}>
            <Text style={styles.analysisLabel}>Injeção detectada:</Text>
            <Text
              style={[
                styles.analysisValue,
                analysisResult.injection_detected
                  ? styles.analysisSuccess
                  : styles.analysisError,
              ]}
            >
              {analysisResult.injection_detected ? 'Sim' : 'Não'}
            </Text>
          </View>
          {analysisResult.confidence !== undefined && (
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>Confiança:</Text>
              <Text style={styles.analysisValue}>
                {Math.round(analysisResult.confidence * 100)}%
              </Text>
            </View>
          )}
          {analysisResult.suggested_tag && (
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>Local sugerido:</Text>
              <Text style={styles.analysisValue}>
                {analysisResult.suggested_tag}
              </Text>
            </View>
          )}
          {!analysisResult.injection_detected && (
            <Button
              title="Confirmar manualmente"
              onPress={confirmManual}
              variant="secondary"
              style={styles.manualButton}
            />
          )}
        </Card>
      )}

      {/* Notas */}
      <Card style={styles.notesCard}>
        <Input
          label="Notas (opcional)"
          placeholder="Adicione observações sobre a injeção..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          style={styles.notesInput}
        />
      </Card>

      {/* Data */}
      <Card style={styles.dateCard}>
        <Text style={styles.cardTitle}>Data da injeção</Text>
        <Text style={styles.dateText}>
          {format(new Date(), "dd/MM/yyyy 'às' HH:mm")}
        </Text>
      </Card>

      {/* Botão salvar */}
      <Button
        title="Registrar injeção"
        onPress={saveInjection}
        loading={saving}
        disabled={!photo && !analysisResult?.injection_detected}
        style={styles.saveButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  photoCard: {
    marginBottom: SPACING.md,
  },
  photo: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  photoPlaceholder: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  photoPlaceholderText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  photoButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    width: '100%',
  },
  photoButton: {
    flex: 1,
  },
  permissionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  analyzingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  analyzingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.surface,
    marginTop: SPACING.md,
  },
  analysisCard: {
    marginBottom: SPACING.md,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  analysisLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  analysisValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  analysisSuccess: {
    color: COLORS.success,
  },
  analysisError: {
    color: COLORS.error,
  },
  manualButton: {
    marginTop: SPACING.md,
  },
  notesCard: {
    marginBottom: SPACING.md,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateCard: {
    marginBottom: SPACING.md,
  },
  dateText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  saveButton: {
    marginTop: SPACING.md,
  },
});

