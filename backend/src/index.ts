/**
 * Servidor Express mock do InjecTrack
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { analyzePhotoRouter } from './routes/analyze-photo';
import { injectionsRouter } from './routes/injections';
import { dailyLogsRouter } from './routes/daily-logs';
import { subscriptionRouter } from './routes/subscription';
import { userRouter } from './routes/user';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InjecTrack API',
      version: '1.0.0',
      description: 'API mock do InjecTrack - MVP',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/analyze-photo', analyzePhotoRouter);
app.use('/api/v1/injections', injectionsRouter);
app.use('/api/v1/daily-logs', dailyLogsRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/user', userRouter);

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger em http://localhost:${PORT}/api-docs`);
});

