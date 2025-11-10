/**
 * Rota de usuário
 */

import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Busca perfil do usuário
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Perfil do usuário
 */
router.get('/profile', async (req: Request, res: Response) => {
  try {
    // Mock: Retorna perfil mock
    const profile = {
      id: 'user_mock',
      name: 'Usuário Teste',
      email: 'teste@example.com',
      sex: 'female',
      birthdate: '1990-01-01',
      height: 170,
      weight: 70,
      goal: 'glute_growth',
      medications: ['ozempic'],
      level: 'beginner',
      intakeTargets: {
        protein: 120,
        fiber: 25,
        water: 2500,
      },
    };

    res.json(profile);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

/**
 * @swagger
 * /api/v1/user/profile:
 *   put:
 *     summary: Atualiza perfil do usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Perfil atualizado
 */
router.put('/profile', async (req: Request, res: Response) => {
  try {
    const updated = {
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    res.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

export { router as userRouter };

