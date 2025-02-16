import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { AwardsService } from 'src/modules/awards/awards.service';
import { CollectionsService } from 'src/modules/collections/collections.service';
import { CountriesService } from 'src/modules/countries/countries.service';
import { GenresService } from 'src/modules/genres/genres.service';
import { PeopleService } from 'src/modules/people/people.service';
import { StudiosService } from 'src/modules/studios/studios.service';
import { UsersService } from 'src/modules/users/users.service';

export type AppDependencies = {
  usersService: UsersService;
  awardsService: AwardsService;
  collectionsService: CollectionsService;
  genresService: GenresService;
  countriesService: CountriesService;
  studiosService: StudiosService;
  peopleService: PeopleService;
};
