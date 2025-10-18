import { AwardsRepository } from 'src/modules/awards/awards.repository';
import { AwardsService } from 'src/modules/awards/awards.service';
import { database } from 'src/modules/database/database.module';

const repository = new AwardsRepository(database);
export const awards = new AwardsService(repository);
