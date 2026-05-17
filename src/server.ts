import { env } from './config/env';
import { connectDB, disconnectDB } from './config/database';
import { logger } from './utils/logger';
import app from './app';

async function bootstrap() {
  await connectDB();
  logger.info('Database connected');

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
    logger.info(`API:     http://localhost:${env.PORT}/api/${env.API_VERSION}`);
    logger.info(`Docs:    http://localhost:${env.PORT}/api-docs`);
    logger.info(`Health:  http://localhost:${env.PORT}/health`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received — shutting down`);
    server.close(async () => {
      await disconnectDB();
      logger.info('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled rejection', { reason });
    process.exit(1);
  });
}

bootstrap().catch((err) => {
  logger.error('Bootstrap failed', { error: err.message });
  process.exit(1);
});
