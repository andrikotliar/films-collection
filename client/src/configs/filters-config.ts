import { FilterItem, InitialData } from '@/types';

export const getFiltersConfig = (initialData: InitialData): FilterItem[] => {
  return [
    {
      title: 'Type',
      property: 'type',
      type: 'checkmark',
      options: initialData.options.types,
      inputType: 'radio',
    },
    {
      title: 'Style',
      property: 'style',
      type: 'checkmark',
      options: initialData.options.styles,
      inputType: 'radio',
    },
    {
      title: 'Genres',
      property: 'genreIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.genres,
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
      property: 'countryIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.countries,
    },
    {
      title: 'Studio',
      property: 'studioIds',
      type: 'checkmark',
      inputType: 'checkbox',
      options: initialData.options.studios,
    },
    {
      title: 'Collections',
      property: 'collectionId',
      type: 'checkmark',
      inputType: 'radio',
      options: initialData.options.collections,
    },
  ];
};
