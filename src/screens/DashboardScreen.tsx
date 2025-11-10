/**
 * Tela de Dashboard - Resumo do dia e progresso
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { COLORS, SPACING, TYPOGRAPHY } from '../utils/constants';
import { apiClient } from '../api/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DashboardScreenProps {
  navigation: any;
}

interface DashboardData {
  today: {
    protein: number;
    fiber: number;
    water: number;
    targets: {
      protein: number;
      fiber: number;
      water: number;
    };
  };
  nextInjection?: {
    date: string;
    daysUntil: number;
  };
  recentSideEffects: any[];
  workoutProgress: {
    week: number;
    day: number;
    completed: boolean;
  };
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data - substituir por chamada real à API
      const mockData: DashboardData = {
        today: {
          protein: 45,
          fiber: 12,
          water: 1200,
          targets: {
            protein: 120,
            fiber: 25,
            water: 2500,
          },
        },
        nextInjection: {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          daysUntil: 3,
        },
        recentSideEffects: [
          { type: 'nausea', severity: 2, date: new Date().toISOString() },
        ],
        workoutProgress: {
          week: 1,
          day: 3,
          completed: false,
        },
      };
      setData(mockData);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  const renderProgressBar = (current: number, target: number, label: string, color: string) => {
    const percentage = getProgressPercentage(current, target);
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>{label}</Text>
          <Text style={styles.progressText}>
            {current} / {target}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percentage}%`, backgroundColor: color },
            ]}
          />
        </View>
      </View>
    );
  };

  if (loading && !data) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
        <Button title="Tentar novamente" onPress={loadDashboardData} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
      </Text>

      {/* Card de registro rápido */}
      <Card style={styles.quickActionCard}>
        <Text style={styles.cardTitle}>Registro rápido</Text>
        <Button
          title="Registrar injeção"
          onPress={() => navigation.navigate('RegisterInjection')}
          style={styles.quickButton}
        />
      </Card>

      {/* Card de macros do dia */}
      <Card style={styles.macrosCard}>
        <Text style={styles.cardTitle}>Acompanhamento de hoje</Text>
        {renderProgressBar(
          data.today.protein,
          data.today.targets.protein,
          'Proteínas (g)',
          COLORS.primary
        )}
        {renderProgressBar(
          data.today.fiber,
          data.today.targets.fiber,
          'Fibras (g)',
          COLORS.secondary
        )}
        {renderProgressBar(
          data.today.water,
          data.today.targets.water,
          'Água (ml)',
          COLORS.secondary
        )}
      </Card>

      {/* Próxima injeção */}
      {data.nextInjection && (
        <Card style={styles.injectionCard}>
          <Text style={styles.cardTitle}>Próxima injeção</Text>
          <Text style={styles.injectionText}>
            Em {data.nextInjection.daysUntil} dia(s)
          </Text>
          <Text style={styles.injectionDate}>
            {format(new Date(data.nextInjection.date), "dd/MM/yyyy", {
              locale: ptBR,
            })}
          </Text>
        </Card>
      )}

      {/* Progresso do treino */}
      <Card style={styles.workoutCard}>
        <Text style={styles.cardTitle}>Treino da semana</Text>
        <Text style={styles.workoutText}>
          Semana {data.workoutProgress.week} - Dia {data.workoutProgress.day}
        </Text>
        <Button
          title={data.workoutProgress.completed ? 'Ver treino' : 'Iniciar treino'}
          onPress={() => navigation.navigate('Workouts')}
          variant="secondary"
          style={styles.workoutButton}
        />
      </Card>

      {/* Efeitos colaterais recentes */}
      {data.recentSideEffects.length > 0 && (
        <Card style={styles.sideEffectsCard}>
          <Text style={styles.cardTitle}>Efeitos colaterais recentes</Text>
          {data.recentSideEffects.map((effect, index) => (
            <View key={index} style={styles.sideEffectItem}>
              <Text style={styles.sideEffectType}>{effect.type}</Text>
              <Text style={styles.sideEffectSeverity}>
                Severidade: {effect.severity}/5
              </Text>
            </View>
          ))}
        </Card>
      )}
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
    textTransform: 'capitalize',
  },
  quickActionCard: {
    marginBottom: SPACING.md,
  },
  quickButton: {
    marginTop: SPACING.md,
  },
  macrosCard: {
    marginBottom: SPACING.md,
  },
  injectionCard: {
    marginBottom: SPACING.md,
  },
  workoutCard: {
    marginBottom: SPACING.md,
  },
  sideEffectsCard: {
    marginBottom: SPACING.md,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
  },
  progressText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  injectionText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  injectionDate: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  workoutText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  workoutButton: {
    marginTop: SPACING.sm,
  },
  sideEffectItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sideEffectType: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sideEffectSeverity: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
});

