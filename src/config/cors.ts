import cors from 'cors';
import { env } from './env';

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || env.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Refresh-Token'],
};
