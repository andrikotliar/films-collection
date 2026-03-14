import type { InitialDataResponse, ListOption } from '@films-collection/shared';
import type { FilterItem } from '../types';

const ALL_OPTION: ListOption<string> = {
  value: 'all',
  label: 'All',
};

const ALL_COLLECTIONS_OPTION: ListOption<number> = {
  value: -1,
  label: 'All Collections',
};

export const getFiltersConfig = (initialData: InitialDataResponse): FilterItem[] => {
  return [
    {
      title: 'Type',
      id: 'type',
      type: 'checkmark',
      options: [ALL_OPTION, ...initialData.options.types],
      inputType: 'radio',
    },
    {
      title: 'Style',
      id: 'style',
      type: 'checkmark',
      options: [ALL_OPTION, ...initialData.options.styles],
      inputType: 'radio',
    },
    {
      title: 'Genres',
      id: 'genreIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.genres,
    },
    {
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
    },
    {
      title: 'Studio',
      id: 'studioIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.studios,
    },
    {
      title: 'Collections',
      id: 'collectionId',
      type: 'checkmark',
      inputType: 'radio',
      options: [ALL_COLLECTIONS_OPTION, ...initialData.options.collections],
    },
  ];
};
