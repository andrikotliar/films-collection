import { DataExplanation } from "@/pages/Info/types";

export const filmDataExplanation: DataExplanation[] = [
  {
    property: 'id',
    type: ['string'],
    description: 'Unique identifier',
    required: true,
  },
  {
    property: 'type',
    type: ['array', 'string'],
    description: 'Divide data into Films and Series, but also can have the Animation type that doesn\'t influence on data, but is useful for filtering. You can mix Film and Animation types and Series and Animation types, but cannot Film and Series.',
    required: true,
    possibleValues: ['Film', 'Animation', 'Series']
  },
  {
    property: 'title',
    type: ['string'],
    description: 'Full film title',
    required: true,
  },
  {
    property: 'poster',
    type: ['array', 'string'],
    description: 'The name of a file that is stored by the /public/posters path and have to have the .webp extension. For the film/animation types it\'s required only one file in the array, for the series type each index is equal to a season.',
    required: true,
    valueExample: '["pirates_of_the_carribean_2"]'
  },
  {
    property: 'trailer',
    type: ['array', 'string'],
    description: 'Youtube video ids. For the film/animation types it\'s required only one ID in the array, for the series type each index is equal to a season.',
    required: true,
    valueExample: '["d9MyW72ELq0"]'
  },
  {
    property: 'genres',
    type: ['array', 'string'],
    description: 'List of film genres. Genre names are not restricted and can be any.',
    required: true,
    valueExample: '["Sci-Fi", "Action"]'
  },
  {
    property: 'production',
    type: ['array', 'string'],
    description: 'List of studios responsible for film creation and promotion. They names are not restricted and can be any.',
    required: true,
    valueExample: '["Pixar Animation"]'
  },
  {
    property: 'crew',
    type: ['array', 'object'],
    description: 'Data about film crew (directors, screenwrites, producers etc.)',
    required: true,
    properties: [
      {
        property: 'role',
        type: ['string'],
        required: true,
        description: 'Define crew position',
        possibleValues: ["director", "screenwriter", "producer", "cameraman", "composer"],
      },
      {
        property: 'people',
        type: ['array', 'object'],
        required: true,
        description: 'List of each person data in a position (role)',
        properties: [
          {
            property: 'name',
            type: ['string'],
            description: 'Name of a person',
            required: true,
          },
          {
            property: 'comment',
            type: ['string'],
            description: 'Additional information about a person, that will be shown on hover over person name on the film page.',
            required: false,
            valueExample: ['(executive producer)', '(season 2)']
          }
        ]
      }
    ]
  },
  {
    property: 'year',
    type: ['number'],
    required: true,
    description: 'Release year'
  },
  {
    property: 'countries',
    type: ['array', 'string'],
    required: true,
    description: 'List of origin countries, can be any string',
    valueExample: '["USA", "UK"]'
  },
  {
    property: 'synopsis',
    type: ['string'],
    required: true,
    description: 'Short description'
  },
  {
    property: 'cast',
    type: ['array', 'object'],
    required: true,
    description: 'Cast details',
    properties: [
      {
        property: 'actorId',
        type: ['string'],
        required: true,
        description: 'Reference to the actor in the actors.json file'
      },
      {
        property: 'character',
        type: ['object'],
        required: true,
        description: 'Actor role details',
        properties: [
          {
            property: 'name',
            type: ['string'],
            required: true,
            description: 'Character name',
            valueExample: "Tony Stark (Iron Man)"
          },
          {
            property: 'imageUrl',
            type: ['array', 'string'],
            required: true,
            description: 'Links to a frame from the film showing the character'
          }
        ]
      }
    ]
  },
  {
    property: 'collections',
    type: ['array', 'object'],
    required: true,
    description: 'Film collections data',
    properties: [
      {
        property: 'title',
        type: ['string'],
        required: true,
        description: 'Every collection title that starts with "Top" will be added to the Tops filter, every collection title that ends with "Universe" will be added to the "Cinematic Universes" filter. Other titles will be grouped into the Collections filter'
      },
      {
        property: 'order',
        type: ['number'],
        required: false,
        description: 'Films order when the list is filtered by a collection title'
      }
    ]
  },
  {
    property: 'duration',
    type: ['number'],
    required: true,
    description: 'Runtime in minutes',
  },
  {
    property: 'budget',
    type: ['object'],
    required: false,
    description: 'Budget details',
    properties: [
      {
        property: 'value',
        type: ['number'],
        required: true,
        description: 'Budget size in number'
      },
      {
        property: 'suffix',
        type: ['string'],
        required: true,
        description: 'Budget grade',
        possibleValues: ['millions', 'billions']
      }
    ]
  },
  {
    property: 'boxoffice',
    type: ['object'],
    required: false,
    description: 'Box Office details',
    properties: [
      {
        property: 'value',
        type: ['number'],
        required: true,
        description: 'Box Office result in number'
      },
      {
        property: 'suffix',
        type: ['string'],
        required: true,
        description: 'Box Office grade',
        possibleValues: ['millions', 'billions']
      }
    ]
  },
  {
    property: 'awards',
    type: ['array', 'object'],
    required: false,
    description: 'Awards that a film has won.',
    properties: [
      {
        property: 'title',
        type: ['string'],
        required: true,
        description: 'Award title',
        valueExample: 'Oscar'
      },
      {
        property: 'nominations',
        type: ['array', 'string'],
        required: true,
        description: 'List of nominations in which a film has won.',
        valueExample: '["Best Achievement in Visual Effects"]'
      },
    ]
  },
  {
    property: 'parts',
    type: ['object'],
    required: false,
    description: 'Related films',
    properties: [
      {
        property: 'title',
        type: ['string'],
        required: true,
        description: 'Films with the same parts title will be gathered into chapters list. Basically it is the base title of a franchise',
        valueExample: 'Pirates of the Caribbean'
      },
      {
        property: 'part',
        type: ['number'],
        required: true,
        description: 'Order of films in the list'
      },
    ]
  },
  {
    property: 'episodes',
    type: ['array', 'object'],
    required: false,
    description: 'Series episodes list',
    properties: [
      {
        property: 'episodeOverall',
        type: ['number'],
        required: true,
        description: 'Episode number through all seasons'
      },
      {
        property: 'episode',
        type: ['number'],
        required: true,
        description: 'Episode number in the current season'
      },
      {
        property: 'title',
        type: ['string'],
        required: true,
        description: 'Episode title'
      },
    ]
  },
];