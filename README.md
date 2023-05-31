# Films Collection Application

The application is developed as my personal collection of favorite films.

All information, posters and videos was taken from open internet resources. Actor photos loads from [the TMDB](https://www.themoviedb.org/) directly.

Source code of the app: [https://github.com/andrikotliar/filmscollection](https://github.com/andrikotliar/filmscollection)

## Data

All data stores in simple json-files. They are combined in the single JSON-file during building by using node-script.

To build your own version of the list, you need to clone the project:

```bash
git clone git@github.com:andrikotliar/filmscollection.git
```

Here's the example of one of films data:

```json
{
  "id": "0ffe6d39-aad8-4540-a218-6b4ceadd9740",
  "title": "Avatar",
  "poster": "avatar",
  "genres": [
    "Sci-Fi",
    "Action"
  ],
  "production": [
    "20th Century FOX"
  ],
  "directedBy": [
    "James Cameron"
  ],
  "producedBy": "James Cameron, Jon Landau",
  "writtenBy": "James Cameron",
  "musicBy": "James Horner",
  "cinematographyBy": "Mauro Fiore",
  "countries": [
    "USA",
    "UK"
  ],
  "budget": {
    "value": 237,
    "suffix": "million"
  },
  "boxoffice": {
    "value": 2.8,
    "suffix": "billion"
  },
  "synopsis": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
  "collections": [
    {
      "name": "Top 10",
      "order": 1
    }
  ],
  "awards": [
    {
      "title": "Oscar",
      "nominations": [
        "Best Achievement in Cinematography",
        "Best Achievement in Visual Effects",
        "Best Achievement in Art Direction"
      ]
    }
  ],
  "type": [
    "Film"
  ],
  "cast": [
    {
      "character": {
        "name": "Jake Sully",
        "imageUrl": "",
        "description": ""
      },
      "actorId": "231acbe9-f5fd-46fb-84ad-0a0ea009f828"
    }
  ],
  "duration": 162,
  "trailer": "5PSNL1qE6VY",
  "parts": {
    "title": "Avatar",
    "part": 1
  },
  "year": 2009
}
```

Series has additional field - seasons with the following data:

```json
"seasons": [
  {
    "season": 1,
    "episodes": [
      {
        "episodeOverall": 1,
        "episode": 1,
        "title": "Chapter One: The Vanishing of Will Byers",
        "directedBy": "The Duffer Brothers",
        "writtenBy": "The Duffer Brothers"
      }
    ]
  }
]
```
## Explanation of some fields

- **Type** - is necessary for dividing data into Films and Series, but also can have the Animation type that doesn't influence on data, but is useful for filtering.
- **Poster** - the field contains the name of a file that is stored by the /public/posters path and have to have the .webp extension.
- **Trailer** - is the ID part of a youtube link: https://www.youtube.com/watch?v=d9MyW72ELq0
- **Collections** - REQUIRED. The field has name and order parameters. Name could be any you want. The order defins in which order to show films in the list. There are two rules to divide into two separate groups of filters. Every collection name that starts with "Top" will be added to the Tops filter, every collection name that ends with "Universe" will be added to the "Cinematic Universes" filter
- **Parts** - is neccessary to show related films on a film page. It has the Part parameter that is similar to the Order parameter in the Collections field. It defines order of film chapters.
- **Cast** - has two required parameters: character and actorId. The Actor ID is a reference to the actor in a separate file: actors.json. This file is a collection of actor names and they photo URLs. The character parameter defined the name of a character and its image from a movie. *The description parameter is deprecated and won't be supported in the future*.

## Tools

There are several node scripts in the root of the project that help to build "database":

- **createDB.js** - the main script that runs on app start and build. It brings together all JSONs from the DB folder into one JSON-file.
- **createStatistic.js** - create data for the statistic page *(in progress)*.
- **buildFiltersConfig.js** - brings distinct values of types, genres, countries, studios. You can manually configure which parameters add to the config. Also, the script define the start year for the year filter *(in progress)*.