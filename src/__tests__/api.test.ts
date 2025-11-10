/**
 * Testes da API - Casos de aceitação
 */

import { apiClient } from "../api/client";
import axios from "axios";

// Mock do axios
jest.mock("axios");

describe("API Client - Casos de Aceitação", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Análise de Foto", () => {
    it("Ao enviar foto válida -> modelo responde detected = true com confidence >= 0.7 -> app marca dia de injeção", async () => {
      const mockResponse = {
        injection_detected: true,
        confidence: 0.85,
        bbox: [10, 10, 200, 200],
        suggested_tag: "abdomen",
      };

      (axios.create as jest.Mock).mockReturnValue({
        post: jest.fn().mockResolvedValue({ data: mockResponse }),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      });

      const result = await apiClient.analyzePhoto("file://photo.jpg");

      expect(result.injection_detected).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.7);
      expect(result.suggested_tag).toBeDefined();
    });

    it("Ao enviar foto sem injeção -> modelo responde detected = false", async () => {
      const mockResponse = { injection_detected: false, confidence: 0.3 };

      (axios.create as jest.Mock).mockReturnValue({
        post: jest.fn().mockResolvedValue({ data: mockResponse }),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      });

      const result = await apiClient.analyzePhoto("file://photo.jpg");

      expect(result.injection_detected).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });
  });

  describe("Registro de Injeção", () => {
    it("Deve registrar injeção com sucesso", async () => {
      const injectionData = {
        date: new Date().toISOString(),
        detected: true,
        confidence: 0.85,
        location: "abdomen",
      };

      (axios.create as jest.Mock).mockReturnValue({
        post: jest.fn().mockResolvedValue({
          data: { id: "inj_123", ...injectionData },
        }),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      });

      const result = await apiClient.registerInjection(injectionData);

      expect(result.id).toBeDefined();
      expect(result.detected).toBe(true);
    });
  });
});
