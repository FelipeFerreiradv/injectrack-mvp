/**
 * Rota de assinatura
 */

import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /api/v1/subscription/create:
 *   post:
 *     summary: Cria nova assinatura
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *                 enum: [stripe, mercadopago]
 *               paymentMethodId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Assinatura criada com sucesso
 */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { provider, paymentMethodId } = req.body;

    // Mock: Em produção, integraria com Stripe ou Mercado Pago
    const subscription = {
      id: `sub_${Date.now()}`,
      provider,
      providerId: paymentMethodId,
      status: 'active',
      startedAt: new Date().toISOString(),
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    res.status(201).json(subscription);
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    res.status(500).json({ error: 'Erro ao criar assinatura' });
  }
});

/**
 * @swagger
 * /api/v1/subscription/status:
 *   get:
 *     summary: Verifica status da assinatura
 *     tags: [Subscription]
 *     responses:
 *       200:
 *         description: Status da assinatura
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    // Mock: Retorna assinatura ativa ou null
    const subscription = {
      id: 'sub_mock',
      status: 'active',
      startedAt: new Date().toISOString(),
    };

    res.json(subscription);
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    res.status(500).json({ error: 'Erro ao verificar assinatura' });
  }
});

/**
 * @swagger
 * /api/v1/subscription/webhook:
 *   post:
 *     summary: Webhook para eventos de pagamento
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processado
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    // Mock: Em produção, validaria assinatura do webhook e processaria evento
    const event = req.body;
    console.log('Webhook recebido:', event);

    res.json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

export { router as subscriptionRouter };

