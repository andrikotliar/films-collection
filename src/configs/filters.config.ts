import { Filter } from '@/common';
import { getYears } from '@/utils';

export const filtersConfig: Filter[] = [
  {
    title: 'Type',
    property: 'type',
    options: ['Film', 'Animation', 'Series'],
  },
  {
    title: 'Genres',
    property: 'genres',
    options: [
      'Sci-Fi',
      'Adventures',
      'Action',
      'Fantasy',
      'Drama',
      'Comedy',
      'Crime',
      'Romance',
      'Thriller',
    ],
  },
  {
    title: 'Year',
    property: 'years',
    options: getYears(),
    defaultOptionTitle: 'All years',
    isScrollable: true,
    isGrid: true,
  },
  {
    title: 'Country',
    property: 'countries',
    options: [
      'USA',
      'UK',
      'Canada',
      'France',
      'Germany',
      'Japan',
    ],
  },
  {
    title: 'Studio',
    property: 'production',
    options: [
      'Walt Disney Pictures',
      'Disney Plus',
      'Pixar Animation',
      'Netflix',
      '20th Century FOX',
      'Lionsgate',
      'Warner Bros. Pictures',
      'HBO Max',
      'DreamWorks Pictures',
      'Lucasfilm',
      'Legendary',
      'Columbia Pictures',
      'Amblin Entertainment',
      'DreamWorks Animation',
      'EuropaCorp',
      'Metro-Goldwyn-Mayer',
      'Summit Entertainment',
    ],
  },
  {
    title: 'Collections',
    property: 'collections',
    options: [
      'Space',
      'Future',
      'Fantasy',
      'Robots',
      'Legends',
      'Invasion',
      'Cars',
      'Dystopia',
      'Mysteries of the Past',
      'True Story',
      'Superheroes',
      'Agents and Detectives',
      'Monsters',
      'Anime',
      'Disaster',
      'Martial Arts',
      'Based on Real Events',
    ],
    isRadio: true,
  },
  {
    title: 'Cinematic Universes',
    property: 'collections',
    options: [
      'Marvel Cinematic Universe',
      'Star Wars Universe',
      'DC Extended Universe',
      'Harry Potter Universe',
      'Middle-Earth Universe',
    ],
    isRadio: true,
  },
  {
    title: 'Tops',
    property: 'collections',
    options: ['Top 10'],
    isRadio: true,
  },
];