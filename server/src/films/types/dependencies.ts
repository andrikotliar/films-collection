import { ActorsService } from 'src/actors/actors.service';
import { FilmsModel } from '../films.model';
import { ChaptersService } from 'src/chapters/chapters.service';

type FilmsServiceDependencies = {
  filmsModel: typeof FilmsModel;
  actorsService: ActorsService;
  chaptersService: ChaptersService;
};

export type { FilmsServiceDependencies };
