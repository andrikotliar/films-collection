import { AwardsService } from 'src/modules/awards/awards.service';
import { CollectionsService } from 'src/modules/collections/collections.service';
import { PeopleService } from 'src/modules/people/people.service';

export type FilmsServiceDependencies = {
  peopleService: PeopleService;
  awardsService: AwardsService;
  collectionsService: CollectionsService;
};
