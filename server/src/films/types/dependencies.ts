import { ActorsService } from 'src/actors/actors.service';
import { FilmsModel } from '../films.model';
import { ChaptersService } from 'src/chapters/chapters.service';
import { AwardsService } from 'src/awards/awards.service';
import { CollectionsService } from 'src/collections/collections.service';

type FilmsServiceDependencies = {
  filmsModel: typeof FilmsModel;
  actorsService: ActorsService;
  chaptersService: ChaptersService;
  awardsService: AwardsService;
  collectionsService: CollectionsService;
};

export type { FilmsServiceDependencies };
