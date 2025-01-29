import { FastifyInstance } from 'fastify';
import {
  registerAuthModule,
  registerAwardsModule,
  registerCountriesModule,
  registerFilmsModule,
  registerGenresModule,
  registerInitialDataModule,
  registerPendingFilmsModule,
  registerPeopleModule,
  registerStudiosModule,
  registerUsersModule,
} from './modules';

export const registerModules = async (root: FastifyInstance) => {
  await root.register(
    (app, _options, done) => {
      registerUsersModule(app);
      registerAuthModule(app);

      registerAwardsModule(app);
      registerCountriesModule(app);
      registerGenresModule(app);
      registerStudiosModule(app);
      registerPeopleModule(app);

      registerFilmsModule(app);

      registerInitialDataModule(app);
      registerPendingFilmsModule(app);

      done();
    },
    { prefix: '/api' },
  );
};
