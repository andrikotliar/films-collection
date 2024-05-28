import { Application } from 'express';
import { filmsRouter } from '../films/films.router';

const createRoutes = (app: Application) => {
  app.use('/films', filmsRouter);
};

export { createRoutes };
