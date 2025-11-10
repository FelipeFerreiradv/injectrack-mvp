/**
 * Rota de logs diários
 */

import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /api/v1/daily-logs:
 *   post:
 *     summary: Registra log diário
 *     tags: [Daily Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               proteinG:
 *                 type: number
 *               fiberG:
 *                 type: number
 *               waterMl:
 *                 type: number
 *               sideEffects:
 *                 type: array
 *     responses:
 *       201:
 *         description: Log registrado com sucesso
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const log = {
      id: `log_${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json(log);
  } catch (error) {
    console.error("Erro ao registrar log:", error);
    res.status(500).json({ error: "Erro ao registrar log" });
  }
});

/**
 * @swagger
 * /api/v1/daily-logs:
 *   get:
 *     summary: Lista logs diários
 *     tags: [Daily Logs]
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
 *         description: Lista de logs
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const logs: any[] = [];
    res.json({ data: logs });
  } catch (error) {
    console.error("Erro ao buscar logs:", error);
    res.status(500).json({ error: "Erro ao buscar logs" });
  }
});

export { router as dailyLogsRouter };
