import morgan from 'morgan';
import { logger } from '../utils/logger';
import { env } from '../config/env';

const stream = { write: (message: string) => logger.http(message.trim()) };

export const httpLogger = morgan(env.isProd ? 'combined' : 'dev', { stream });
