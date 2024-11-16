import { CollectionType, ListType } from '@/enums';
import { FilterItem } from '@/types';

const getFiltersConfig = (optionsMap: {
  [key in ListType | CollectionType]: string[];
}): FilterItem[] => {
  return [
    {
      title: 'Type',
      property: 'type',
      type: 'checkmark',
      options: optionsMap[ListType.TITLE_TYPES],
      inputType: 'radio',
    },
    {
      title: 'Style',
      property: 'style',
      type: 'checkmark',
      options: optionsMap[ListType.STYLES],
      inputType: 'radio',
    },
    {
      title: 'Genres',
      property: 'genres',
      type: 'checkmark',
      inputType: 'checkbox',
      options: optionsMap[ListType.GENRES],
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
      options: optionsMap[ListType.COUNTRIES],
    },
    {
      title: 'Studio',
      property: 'studios',
      type: 'checkmark',
      inputType: 'checkbox',
      options: optionsMap[ListType.STUDIOS],
    },
    {
      title: 'Main theme',
      property: 'collection',
      type: 'checkmark',
      inputType: 'radio',
      options: optionsMap[CollectionType.GENERAL],
    },
    {
      title: 'Cinematic Universes',
      property: 'collection',
      type: 'checkmark',
      inputType: 'radio',
      options: optionsMap[CollectionType.CINEMATIC_UNIVERSE],
    },
    {
      title: 'Tops',
      property: 'collection',
      options: optionsMap[CollectionType.TOP],
      type: 'checkmark',
      inputType: 'radio',
    },
  ];
};

export { getFiltersConfig };
