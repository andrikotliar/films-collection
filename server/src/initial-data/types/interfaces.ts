import { FastifyReply, FastifyRequest } from 'fastify';
import { InitialData } from './initial-data';

interface IInitialDataService {
  getConfig(): Promise<InitialData>;
}

interface IInitialDataController {
  getConfig(request: FastifyRequest, reply: FastifyReply): Promise<never>;
}

export { IInitialDataService, IInitialDataController };
