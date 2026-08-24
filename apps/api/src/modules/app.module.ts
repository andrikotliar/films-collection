import { AuthModule } from './auth/auth.module.js';
import { AiModule } from './ai/ai.module.js';
import { ArticlesModule } from './articles/articles.module.js';
import { AwardsModule } from './awards/awards.module.js';
import { CacheModule } from './cache/cache.module.js';
import { CollectionEventsModule } from './collection-events/collection-events.module.js';
import { CollectionsModule } from './collections/collections.module.js';
import { ConfigModule } from './config/config.module.js';
import { CountriesModule } from './countries/countries.module.js';
import { FilesModule } from './files/files.module.js';
import { FilmsModule } from './films/films.module.js';
import { GenresModule } from './genres/genres.module.js';
import { InitialDataModule } from './initial-data/initial-data.module.js';
import { PeopleModule } from './people/people.module.js';
import { StorageModule } from './storage/storage.module.js';
import { StudiosModule } from './studios/studios.module.js';
import { UsersModule } from './users/users.module.js';

export const appModule = [
  AiModule,
  AuthModule,
  ArticlesModule,
  AwardsModule,
  CacheModule,
  CollectionEventsModule,
  CollectionsModule,
  ConfigModule,
  CountriesModule,
  FilesModule,
  FilmsModule,
  GenresModule,
  InitialDataModule,
  PeopleModule,
  StorageModule,
  StudiosModule,
  UsersModule,
];

export type ApiServices = typeof AiModule.services &
  typeof AuthModule.services &
  typeof ArticlesModule.services &
  typeof AwardsModule.services &
  typeof CacheModule.services &
  typeof CollectionEventsModule.services &
  typeof CollectionsModule.services &
  typeof ConfigModule.services &
  typeof CountriesModule.services &
  typeof FilesModule.services &
  typeof FilmsModule.services &
  typeof GenresModule.services &
  typeof InitialDataModule.services &
  typeof PeopleModule.services &
  typeof StorageModule.services &
  typeof StudiosModule.services &
  typeof UsersModule.services;
