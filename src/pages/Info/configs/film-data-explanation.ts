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
    type: ['array'],
    description: 'Entity types. The property helps quickly access to series or animation lists. Some properties entity can have only when it has the Series type.',
    required: true,
    arrayItemsType: ['string'],
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
    type: ['array'],
    description: 'File name without extension. Files are stored by the /public/posters path and should have the .webp extension',
    required: true,
    arrayItemsType: ['string'],
    valueExample: '["pirates_of_the_carribean_2"]'
  },
  {
    property: 'trailer',
    type: ['array'],
    description: 'Youtube video ID. This property has to be added when the type is either Film or Animation. In case when this property is omited, the placeholder will be displayed on a film page.',
    required: false,
    requiredPartially: true,
    arrayItemsType: ['string'],
    valueExample: '["d9MyW72ELq0"]'
  },
  {
    property: 'genres',
    type: ['array'],
    description: 'List of film genres.',
    required: true,
    arrayItemsType: ['string'],
    valueExample: '["Sci-Fi", "Action"]'
  },
  {
    property: 'production',
    type: ['array'],
    description: 'List of studios responsible for film creation and promotion.',
    required: true,
    arrayItemsType: ['string'],
    valueExample: '["Pixar Animation"]'
  },
  {
    property: 'crew',
    type: ['array'],
    description: 'Data about film crew (directors, screenwrites, producers etc.)',
    required: true,
    arrayItemsType: ['object'],
    properties: [
      {
        property: 'role',
        type: ['string'],
        required: true,
        description: 'Define crew position',
        valueExample: ['Directed by', 'Written by']
      },
      {
        property: 'people',
        type: ['array'],
        required: true,
        description: 'List of each person data in a position (role)',
        arrayItemsType: ['object'],
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
    type: ['array'],
    required: true,
    description: 'List of origin countries, can be any string',
    arrayItemsType: ['string'],
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
    type: ['array'],
    required: true,
    description: 'Cast details',
    arrayItemsType: ['string'],
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
            type: ['array'],
            required: true,
            arrayItemsType: ['string'],
            description: 'Links to a frame from the film showing the character'
          }
        ]
      }
    ]
  },
  {
    property: 'collections',
    type: ['array'],
    required: true,
    description: 'Film collections data',
    arrayItemsType: ['object'],
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
    type: ['array'],
    required: false,
    description: 'Awards that a film has won.',
    arrayItemsType: ['object'],
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
        type: ['array'],
        required: true,
        description: 'List of nominations in which a film has won.',
        arrayItemsType: ['string'],
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
    property: 'seasons',
    type: ['array'],
    required: false,
    requiredPartially: true,
    description: 'Series specific data. Required only for Series type. If omit this property, posters, trailers and episodes list will not be displayed on a film page.',
    arrayItemsType: ['object'],
    properties: [
      {
        property: 'season',
        type: ['number'],
        required: true,
        description: 'Season number'
      },
      {
        property: 'trailer',
        type: ['string'],
        required: true,
        description: 'Season trailer. Youtube video ID',
        valueExample: 'a3thyAnShck',
      },
      {
        property: 'year',
        type: ['number'],
        required: true,
        description: 'Season release year'
      },
      {
        property: 'episodes',
        type: ['array'],
        required: true,
        description: 'List of episodes',
        arrayItemsType: ['object'],
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
    ]
  },
];