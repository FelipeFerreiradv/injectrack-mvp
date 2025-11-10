/**
 * Rota de injeções
 */

import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /api/v1/injections:
 *   post:
 *     summary: Registra uma nova injeção
 *     tags: [Injections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               photoUrl:
 *                 type: string
 *               detected:
 *                 type: boolean
 *               confidence:
 *                 type: number
 *               location:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Injeção registrada com sucesso
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const injection = {
      id: `inj_${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    // Mock: Em produção, salvaria no banco de dados
    res.status(201).json(injection);
  } catch (error) {
    console.error("Erro ao registrar injeção:", error);
    res.status(500).json({ error: "Erro ao registrar injeção" });
  }
});

/**
 * @swagger
 * /api/v1/injections:
 *   get:
 *     summary: Lista injeções do usuário
 *     tags: [Injections]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de injeções
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    // Mock: Retorna lista vazia ou dados mock
    const injections: any[] = [];
    res.json({ data: injections });
  } catch (error) {
    console.error("Erro ao buscar injeções:", error);
    res.status(500).json({ error: "Erro ao buscar injeções" });
  }
});

export { router as injectionsRouter };
