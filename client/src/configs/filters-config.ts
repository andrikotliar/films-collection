import { CollectionType, ListType } from '@/enums';
import { getFilterOptions } from '@/helpers';
import { FilterItem, InitialData } from '@/types';

export const getFiltersConfig = (initialData: InitialData): FilterItem[] => {
  return [
    {
      title: 'Type',
      property: 'type',
      type: 'checkmark',
      options: getFilterOptions(
        initialData.options.general[ListType.TITLE_TYPES],
      ),
      inputType: 'radio',
    },
    {
      title: 'Style',
      property: 'style',
      type: 'checkmark',
      options: getFilterOptions(initialData.options.general[ListType.STYLES]),
      inputType: 'radio',
    },
    {
      title: 'Genres',
      property: 'genres',
      type: 'checkmark',
      inputType: 'checkbox',
      options: getFilterOptions(initialData.options.general[ListType.GENRES]),
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
      options: getFilterOptions(
        initialData.options.general[ListType.COUNTRIES],
      ),
    },
    {
      title: 'Studio',
      property: 'studios',
      type: 'checkmark',
      inputType: 'checkbox',
      options: getFilterOptions(initialData.options.general[ListType.STUDIOS]),
    },
    {
      title: 'Main theme',
      property: 'collection',
      type: 'checkmark',
      inputType: 'radio',
      options: getFilterOptions(
        initialData.options.collections[CollectionType.GENERAL],
      ),
    },
    {
      title: 'Cinematic Universes',
      property: 'collection',
      type: 'checkmark',
      inputType: 'radio',
      options: getFilterOptions(
        initialData.options.collections[CollectionType.CINEMATIC_UNIVERSE],
      ),
    },
    {
      title: 'Tops',
      property: 'collection',
      options: getFilterOptions(
        initialData.options.collections[CollectionType.TOP],
      ),
      type: 'checkmark',
      inputType: 'radio',
    },
  ];
};
