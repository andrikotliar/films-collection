import { awards } from '~/modules/awards/awards.module';
import { collectionEvents } from '~/modules/collection-events/collection-events.module';
import { collections } from '~/modules/collections/collections.module';
import { countries } from '~/modules/countries/countries.module';
import { genres } from '~/modules/genres/genres.module';
import { InitialDataService } from '~/modules/initial-data/initial-data.service';
import { studios } from '~/modules/studios/studios.module';

export const initialData = new InitialDataService(
  collections,
  genres,
  countries,
  studios,
  collectionEvents,
  awards,
);
