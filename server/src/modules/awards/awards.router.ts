import { FastifyInstance } from 'fastify';
import { FindNominationsSchema } from 'src/modules/awards/schemas';

export const AwardsRouter = async (awardsModule: FastifyInstance) => {
  awardsModule.route({
    method: 'GET',
    url: '/nominations',
    handler: awardsModule.awardsController.findNominations,
    schema: {
      querystring: FindNominationsSchema,
    },
  });
};
