import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
// import type { ApiModules } from '~/modules/index.js';

type ModulesPluginOptions = {
  modules: any;
};

const ModulesPluginBase: FastifyPluginAsync<ModulesPluginOptions> = async (app, { modules }) => {
  app.decorate('modules', modules);
};

export const ModulesPlugin = fastifyPlugin(ModulesPluginBase);
