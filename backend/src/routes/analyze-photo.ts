/**
 * Rota de análise de foto - Mock do modelo ML
 */

import { Router, Request, Response } from 'express';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /api/v1/analyze-photo:
 *   post:
 *     summary: Analisa foto para detectar injeção
 *     tags: [ML]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Análise concluída
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 injection_detected:
 *                   type: boolean
 *                 confidence:
 *                   type: number
 *                   minimum: 0
 *                   maximum: 1
 *                 bbox:
 *                   type: array
 *                   items:
 *                     type: number
 *                 suggested_tag:
 *                   type: string
 *                   enum: [abdomen, arm, thigh, other]
 *                 metadata:
 *                   type: object
 */
router.post('/', upload.single('photo'), async (req: Request, res: Response) => {
  try {
    // Mock: Simula análise de foto
    // Em produção, aqui seria a chamada ao modelo ML (TensorFlow Lite ou API)
    
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Foto não fornecida' });
    }

    // Simulação: 70% de chance de detectar injeção
    const random = Math.random();
    const detected = random > 0.3;
    const confidence = detected ? 0.7 + Math.random() * 0.3 : Math.random() * 0.5;
    
    const locations: Array<'abdomen' | 'arm' | 'thigh' | 'other'> = ['abdomen', 'arm', 'thigh', 'other'];
    const suggestedTag = locations[Math.floor(Math.random() * locations.length)];

    const response = {
      injection_detected: detected,
      confidence: Math.round(confidence * 100) / 100,
      bbox: detected ? [10, 10, 200, 200] : undefined,
      suggested_tag: detected ? suggestedTag : undefined,
      metadata: detected ? {
        syringe_type: 'insulin',
        ampoule_type: 'semaglutide',
      } : undefined,
    };

    // Simula delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json(response);
  } catch (error) {
    console.error('Erro ao analisar foto:', error);
    res.status(500).json({ error: 'Erro ao processar foto' });
  }
});

export { router as analyzePhotoRouter };

