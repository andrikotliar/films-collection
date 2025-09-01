import { awards } from 'src/modules/awards/awards.module';
import { collectionEvents } from 'src/modules/collection-events/collection-events.module';
import { collections } from 'src/modules/collections/collections.module';
import { countries } from 'src/modules/countries/countries.module';
import { genres } from 'src/modules/genres/genres.module';
import { InitialDataService } from 'src/modules/initial-data/initial-data.service';
import { studios } from 'src/modules/studios/studios.module';

export const initialData = new InitialDataService(
  collections,
  genres,
  countries,
  studios,
  collectionEvents,
  awards,
);
