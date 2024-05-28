import express from 'express';
import { config } from 'dotenv';
import { createRoutes } from './router';

config();

const PORT = process.env.PORT ?? 5000;

const server = () => {
  const app = express();

  createRoutes(app);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

export { server };
