import { FastifyInstance } from 'fastify';
import {
  AuthModule,
  AwardsModule,
  CollectionEventsModule,
  CollectionsModule,
  CountriesModule,
  FilesModule,
  FilmsModule,
  GenresModule,
  InitialDataModule,
  PendingFilmsModule,
  PeopleModule,
  StudiosModule,
  UsersModule,
} from './modules';

export const AppModule = async (app: FastifyInstance) => {
  app.register(FilesModule);
  app.register(UsersModule);
  app.register(AuthModule);
  app.register(AwardsModule);
  app.register(CountriesModule);
  app.register(GenresModule);
  app.register(StudiosModule);
  app.register(CollectionsModule);
  app.register(PeopleModule);
  app.register(FilmsModule);
  app.register(CollectionEventsModule);
  app.register(InitialDataModule);
  app.register(PendingFilmsModule);
};
