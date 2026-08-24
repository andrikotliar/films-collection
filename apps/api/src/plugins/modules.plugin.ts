import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import type { ApiModule } from '~/shared/helpers/create-api-module.js';

type ModulesPluginOptions = {
  modules: ApiModule<any>[];
};

const ModulesPluginBase: FastifyPluginAsync<ModulesPluginOptions> = async (app, { modules }) => {
  app.decorate('modules', modules);
};

export const ModulesPlugin = fastifyPlugin(ModulesPluginBase);
