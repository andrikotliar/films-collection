import { buildFilterOptions } from '@/helpers/build-filter-options';
import {
  cinematicUniversesCollectionTitles,
  countryTitles,
  generalCollectionTitles,
  studioTitles,
  titleTypeTitles,
  topsCollectionTitles,
} from '@/titles';
import { genreTitles } from '@/titles/genre-titles';
import { Filters } from '@/types';

const filtersConfig: Filters = {
  general: [
    {
      title: 'Type',
      property: 'type',
      type: 'checkmark',
      options: buildFilterOptions(titleTypeTitles),
      inputType: 'checkbox',
    },
    {
      title: 'Genres',
      property: 'genres',
      type: 'checkmark',
      inputType: 'checkbox',
      options: buildFilterOptions(genreTitles),
    },
    {
      title: 'Date Range',
      inputs: {
        start: {
          label: 'Start Date',
          property: 'startDate',
        },
        end: {
          label: 'End Date',
          property: 'endDate',
        },
      },
      type: 'daterange',
    },
    {
      title: 'Country',
      property: 'countries',
      type: 'checkmark',
      inputType: 'checkbox',
      options: buildFilterOptions(countryTitles),
    },
    {
      title: 'Studio',
      property: 'studios',
      type: 'checkmark',
      inputType: 'checkbox',
      options: buildFilterOptions(studioTitles),
    },
    {
      title: 'Extra filtes',
      property: 'extra',
      type: 'checkmark',
      inputType: 'radio',
      options: [
        {
          filter: 'isLatestAdded',
          title: 'Latest Added',
        },
      ],
    },
  ],
  collections: [
    {
      title: 'Main theme',
      property: 'collections',
      type: 'checkmark',
      inputType: 'radio',
      options: buildFilterOptions(generalCollectionTitles),
    },
    {
      title: 'Cinematic Universes',
      property: 'collections',
      type: 'checkmark',
      inputType: 'radio',
      options: buildFilterOptions(cinematicUniversesCollectionTitles),
    },
    {
      title: 'Tops',
      property: 'collections',
      options: buildFilterOptions(topsCollectionTitles),
      type: 'checkmark',
      inputType: 'radio',
    },
  ],
};

export { filtersConfig };
