/**
 * Cliente API com suporte offline
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getAuthToken, removeAuthToken } from '../utils/storage';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token
    this.client.interceptors.request.use(
      async (config) => {
        const token = await getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para tratar erros
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expirado - remover e redirecionar para login
          await removeAuthToken();
          // TODO: Redirecionar para tela de login
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Analisa foto para detectar injeção
   */
  async analyzePhoto(photoUri: string): Promise<any> {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);

    const response = await this.client.post('/analyze-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  /**
   * Registra injeção
   */
  async registerInjection(data: {
    date: string;
    photoUrl?: string;
    detected: boolean;
    confidence?: number;
    location?: string;
    notes?: string;
  }): Promise<any> {
    const response = await this.client.post('/injections', data);
    return response.data;
  }

  /**
   * Registra log diário
   */
  async registerDailyLog(data: {
    date: string;
    proteinG: number;
    fiberG: number;
    waterMl: number;
    sideEffects: any[];
  }): Promise<any> {
    const response = await this.client.post('/daily-logs', data);
    return response.data;
  }

  /**
   * Cria assinatura
   */
  async createSubscription(data: {
    provider: 'stripe' | 'mercadopago';
    paymentMethodId: string;
  }): Promise<any> {
    const response = await this.client.post('/subscription/create', data);
    return response.data;
  }

  /**
   * Verifica status da assinatura
   */
  async getSubscriptionStatus(): Promise<any> {
    const response = await this.client.get('/subscription/status');
    return response.data;
  }

  /**
   * Busca perfil do usuário
   */
  async getUserProfile(): Promise<any> {
    const response = await this.client.get('/user/profile');
    return response.data;
  }

  /**
   * Atualiza perfil do usuário
   */
  async updateUserProfile(data: any): Promise<any> {
    const response = await this.client.put('/user/profile', data);
    return response.data;
  }

  /**
   * Busca injeções do usuário
   */
  async getInjections(startDate?: string, endDate?: string): Promise<any> {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await this.client.get('/injections', { params });
    return response.data;
  }

  /**
   * Busca logs diários
   */
  async getDailyLogs(startDate?: string, endDate?: string): Promise<any> {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await this.client.get('/daily-logs', { params });
    return response.data;
  }
}

export const apiClient = new ApiClient();

