import { CrewPosition, TitleStyle, TitleType } from '@prisma/client';

export type FindAllFilters = {
  type: TitleType;
  style: TitleStyle;
  startDate: string;
  endDate: string;
  collectionId: number;
  seasonsTotal: number;
  episodesTotal: number;
  rating: number;
  duration: number;
  crewMemberId: number;
  crewMemberPosition: CrewPosition;
  actorId: number;
  budget: number;
  boxOffice: number;
  genreIds: number[];
  countryIds: number[];
  studioIds: number[];
  awardIds: number[];
  searchAnniversaries: boolean;
  ids: number[];
};

export type FindAllQueries = Partial<FindAllFilters> & {
  limit: number;
  skip: number;
};

export type FindOneParams = {
  id: number;
};

export type FindBySearchString = {
  q: string;
};
