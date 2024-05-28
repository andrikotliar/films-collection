import { Router } from 'express';
import { FilmsController } from './films.controller';

const filmsController = new FilmsController();
const filmsRouter = Router();

filmsRouter.get('/', filmsController.find);

export { filmsRouter };
