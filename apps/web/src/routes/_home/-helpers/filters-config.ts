import {
  GetFilmsListQuerySchema,
  TitleStyle,
  TitleType,
  type FilmStatsResponse,
  type InitialDataResponse,
  type ListOption,
} from '@films-collection/shared';
import { z } from 'zod';
import { api, queryKey, type FilterItem } from '~/shared';

const ALL_OPTION: ListOption<string> = {
  value: 'all',
  label: 'All',
};

const ALL_COLLECTIONS_OPTION: ListOption<number> = {
  value: -1,
  label: 'All Collections',
};

export const FiltersSchema = GetFilmsListQuerySchema.extend({
  type: z.enum({ ...TitleType, all: 'all' }),
  style: z.enum({ ...TitleStyle, all: 'all' }),
});

type FilterValues = z.infer<typeof FiltersSchema>;

export const filterDefaultValues: FilterValues = {
  genreIds: [],
  countryIds: [],
  studioIds: [],
  type: 'all',
  style: 'all',
  collectionId: -1,
};

export const getFiltersConfig = (
  initialData: InitialDataResponse,
  stats?: FilmStatsResponse,
): Array<FilterItem<FilterValues>> => {
  return [
    {
      title: 'Type',
      id: 'type',
      type: 'checkmark',
      options: [ALL_OPTION, ...initialData.options.types],
      inputType: 'radio',
      stats: stats?.types,
    },
    {
      title: 'Seasons total',
      id: 'seasonsTotal',
      type: 'number',
      dependsOn: {
        filter: 'type',
        value: TitleType.SERIES,
      },
    },
    {
      title: 'Episodes total',
      id: 'episodesTotal',
      type: 'number',
      dependsOn: {
        filter: 'type',
        value: TitleType.SERIES,
      },
    },
    {
      title: 'Style',
      id: 'style',
      type: 'checkmark',
      options: [ALL_OPTION, ...initialData.options.styles],
      inputType: 'radio',
      stats: stats?.styles,
    },
    {
      title: 'Genres',
      id: 'genreIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.genres,
      stats: stats?.genres,
    },
    {
      title: 'Rating',
      id: 'rating',
      type: 'rating',
      size: 3,
    },
    {
      id: 'startDate',
      title: 'Date Range',
      inputs: {
        start: {
          label: 'Start Date',
          id: 'startDate',
        },
        end: {
          label: 'End Date',
          id: 'endDate',
        },
      },
      type: 'daterange',
    },
    {
      title: 'Country',
      id: 'countryIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.countries,
      stats: stats?.countries,
    },
    {
      title: 'Studio',
      id: 'studioIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.studios,
      stats: stats?.studios,
    },
    {
      title: 'Collections',
      id: 'collectionId',
      type: 'checkmark',
      inputType: 'radio',
      options: [ALL_COLLECTIONS_OPTION, ...initialData.options.collections],
      stats: stats?.collections,
    },
    {
      title: 'People by role',
      id: 'personId',
      type: 'combo-select',
      dependency: {
        id: 'personRole',
        label: 'Role',
        options: initialData.options.roles,
      },
      selector: {
        id: 'personId',
        isMultiple: false,
        loader: api.people.search,
        queryKey: [queryKey('people.search')],
        label: 'Person',
      },
    },
    {
      id: 'runtimeRange',
      type: 'range',
      title: 'Runtime, min',
      min: 0,
      max: 300,
      step: 10,
    },
    {
      id: 'awardId',
      type: 'select',
      title: 'Award',
      options: initialData.options.awards,
    },
  ];
};
