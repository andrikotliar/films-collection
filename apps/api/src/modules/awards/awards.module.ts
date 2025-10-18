import { AwardsRepository } from '~/modules/awards/awards.repository';
import { AwardsService } from '~/modules/awards/awards.service';
import { database } from '~/modules/database/database.module';

const repository = new AwardsRepository(database);
export const awards = new AwardsService(repository);
