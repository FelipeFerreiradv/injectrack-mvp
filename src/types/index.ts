/**
 * Tipos principais do InjecTrack
 */

// Tipos de usuário
export type Sex = 'male' | 'female' | 'other';
export type MedicationType = 'ozempic' | 'anabolic' | 'both' | 'none';
export type WorkoutGoal = 'glute_growth' | 'weight_loss' | 'muscle_gain' | 'endurance' | 'general';
export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';

// Perfil do usuário
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  sex: Sex;
  birthdate: string;
  height: number; // cm
  weight: number; // kg
  goal: WorkoutGoal;
  medications: MedicationType[];
  level: WorkoutLevel;
  intakeTargets: {
    protein: number; // g
    fiber: number; // g
    water: number; // ml
  };
  createdAt: string;
}

// Registro de injeção
export interface Injection {
  id: string;
  userId: string;
  date: string; // ISO date
  photoUrl?: string;
  detected: boolean;
  confidence?: number;
  location?: 'abdomen' | 'arm' | 'thigh' | 'other';
  notes?: string;
  createdAt: string;
}

// Log diário
export interface DailyLog {
  id: string;
  userId: string;
  date: string; // ISO date
  proteinG: number;
  fiberG: number;
  waterMl: number;
  sideEffects: SideEffect[];
  createdAt: string;
}

// Efeito colateral
export interface SideEffect {
  id: string;
  type: string; // 'nausea', 'headache', 'fatigue', etc.
  severity: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  notes?: string;
  timestamp: string;
}

// Treino
export interface Workout {
  id: string;
  userId: string;
  week: number;
  day: number;
  exerciseList: Exercise[];
  completed: boolean;
  completedAt?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number; // kg
  restSeconds?: number;
  videoUrl?: string;
  notes?: string;
}

// Assinatura
export interface Subscription {
  id: string;
  userId: string;
  provider: 'stripe' | 'mercadopago';
  providerId: string;
  status: 'active' | 'canceled' | 'expired' | 'trial';
  startedAt: string;
  endedAt?: string;
  trialEndsAt?: string;
}

// Resposta da API de análise de foto
export interface PhotoAnalysisResponse {
  injection_detected: boolean;
  confidence: number;
  bbox?: [number, number, number, number]; // [x, y, width, height]
  suggested_tag?: 'abdomen' | 'arm' | 'thigh' | 'other';
  metadata?: {
    syringe_type?: string;
    ampoule_type?: string;
  };
}

// Dados de onboarding
export interface OnboardingData {
  name: string;
  email: string;
  password: string;
  sex: Sex;
  birthdate: string;
  height: number;
  weight: number;
  goal: WorkoutGoal;
  medications: MedicationType[];
  level: WorkoutLevel;
  notificationsEnabled: boolean;
  privacyConsent: boolean;
}

