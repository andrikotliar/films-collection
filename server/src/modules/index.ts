import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AwardsModule } from './awards/awards.module';
import { CollectionsModule } from './collections/collections.module';
import { CountriesModule } from './countries/countries.module';
import { FilmsModule } from './films/films.module';
import { GenresModule } from './genres/genres.module';
import { InitialDataModule } from './initial-data/initial-data.module';
import { PendingFilmsModule } from './pending-films/pending-films.module';
import { PeopleModule } from './people/people.module';
import { StudiosModule } from './studios/studios.module';
import { CollectionEventsModule } from './collection-events/collection-events.module';
import { FilesModule } from './files/files.module';
import { ChapterKeysModule } from './chapter-keys/chapter-keys.module';

export const modules = [
  FilesModule,
  UsersModule,
  AuthModule,
  AwardsModule,
  CountriesModule,
  GenresModule,
  StudiosModule,
  CollectionsModule,
  PeopleModule,
  FilmsModule,
  CollectionEventsModule,
  InitialDataModule,
  PendingFilmsModule,
  ChapterKeysModule,
];
