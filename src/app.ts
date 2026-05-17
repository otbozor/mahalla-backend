import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { corsOptions } from './config/cors';
import { swaggerSpec } from './config/swagger';
import { env } from './config/env';
import { httpLogger } from './middlewares/logger.middleware';
import { globalLimiter } from './middlewares/rateLimiter.middleware';
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware';
import routes from './routes';

const app = express();

// Security
app.use(helmet());
app.use(cors(corsOptions));
app.set('trust proxy', 1);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(httpLogger);

// Rate limiting
app.use(globalLimiter);

// API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV, timestamp: new Date().toISOString() });
});

// API routes
app.use(`/api/${env.API_VERSION}`, routes);

// 404 & error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
