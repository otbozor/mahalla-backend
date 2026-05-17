import swaggerJSDoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jasorat MFY API',
      version: '1.0.0',
      description: 'Jasorat Mahalla Fuqarolar Yig\'ini — REST API Documentation',
      contact: { name: 'Jasorat MFY', email: 'admin@jasoratmfy.uz' },
    },
    servers: [
      { url: `http://localhost:${env.PORT}/api/${env.API_VERSION}`, description: 'Development' },
      { url: `https://api.jasoratmfy.uz/api/${env.API_VERSION}`, description: 'Production' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.routes.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
