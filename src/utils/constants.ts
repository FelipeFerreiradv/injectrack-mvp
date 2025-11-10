/**
 * Constantes do aplicativo
 */

export const COLORS = {
  primary: '#2C3E50',
  secondary: '#3498DB',
  accent: '#E74C3C',
  success: '#27AE60',
  warning: '#F39C12',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  border: '#E0E0E0',
  error: '#E74C3C',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://api.injectrack.com/api/v1';

export const SUBSCRIPTION_PRICE = 20; // R$ 20/mês
export const FREE_TRIAL_DAYS = 7;
export const FREE_VERSION_HISTORY_DAYS = 7;

export const ML_CONFIDENCE_THRESHOLD = 0.7;

