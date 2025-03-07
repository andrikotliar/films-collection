import { FilterItem, InitialData } from '@/types';
import { CalendarIcon, HistoryIcon } from 'lucide-react';

export const getFiltersConfig = (initialData: InitialData): FilterItem[] => {
  return [
    {
      title: 'Type',
      id: 'type',
      type: 'checkmark',
      options: initialData.options.types,
      inputType: 'radio',
    },
    {
      title: 'Style',
      id: 'style',
      type: 'checkmark',
      options: initialData.options.styles,
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
      options: initialData.options.collections,
    },
    {
      id: 'additional',
      title: 'Additional',
      type: 'nested',
      options: [
        {
          label: 'Anniversaries',
          id: 'searchAnniversaries',
          icon: <CalendarIcon size={18} />,
        },
        {
          label: 'Last visited films',
          id: 'searchLastVisitedFilms',
          icon: <HistoryIcon size={18} />,
        },
      ],
    },
  ];
};
