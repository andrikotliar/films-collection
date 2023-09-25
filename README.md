# Films Collection Application

The application is developed as my personal collection of favorite films.

All information, posters and videos was taken from open resources. Actor photos are loaded from [the TMDB](https://www.themoviedb.org/) directly.

App source code: [https://github.com/andrikotliar/filmscollection](https://github.com/andrikotliar/filmscollection)

## Data

All data stores in json-files, that are combined into the **database.json** file after the build or start command is run.

To build your own version of the list, clone the project:

```bash
git clone git@github.com:andrikotliar/filmscollection.git
cd filmscollection
```

Add or delete films form the db folder and then run commands:

```bash
npm install
npm start
```
It will install all required packages, create the "database" file and start the development server.

Or run following commads to build project for the production:

```bash
npm install
npm run build
```

## Data schema

```JSON
{
  "title": "Film/Series",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "UUID"
    },
    "type": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "enum": ["Film", "Animation", "Series"]
    },
    "title": {
      "type": "string"
    },
    "genres": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "trailers": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Youtube video IDs"
    },
    "posters": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Poster links"
    },
    "description": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "plot": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "episodes": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "episodeOverall": {
                  "type": "number",
                  "description": "The number of an episode through whole series"
                },
                "episode": {
                  "type": "number",
                  "description": "The number of an episode in a current season"
                },
                "title": {
                  "type": "string"
                }
              },
              "required": ["episodesOverall", "episode", "title"]
            }
          },
          "year": {
            "type": "number",
            "description": "The field doesn't appear on Film and Animation types and represents the series season start year"
          }
        },
        "required": ["plot"]
      },
      "description": "Items with type Film or Animation have to contain only one element. The app doesn't provide a way to interact with multiple descriptions for this type. Each index of the array represents a season for a Series type."
    },
    "crew": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "description": "Describes position of a people group"
          },
          "people": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "comment": {
                  "type": "string",
                  "description": "Extra information about a person"
                }
              },
              "required": ["name"]
            }
          }
        },
        "required": ["role", "people"]
      }
    },
    "year": {
      "type": "number",
      "description": "Release year. Use start year of the first season for the Series type."
    },
    "countries": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "production": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The list of companies that were involved in the movie production."
    },
    "duration": {
      "type": "number",
      "description": "Runtime of a movie in minutes. Use total runtime of all seasons for the Series type."
    },
    "cast": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "actorId": {
            "type": "string",
            "description": "ID of an actor from actors.json file in the public folder."
          },
          "character": {
            "type": "object",
            "description": "Role of an actor",
            "properties": {
              "name": {
                "type": "string"
              },
              "imageUrl": {
                "type": "string",
                "description": "Link to a character image. Usually it is a frame from a movie with this character."
              }
            },
            "required": ["name"]
          }
        },
        "required": ["character", "actorId"]
      } 
    },
    "collections": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "order": {
            "type": "number",
            "description": "Defines an order within a collection."
          }
        },
        "required": ["title"]
      }
    },
    "budget": {
      "type": "number"
    },
    "boxoffice": {
      "type": "number"
    },
    "awards": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "nominations": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": ["title", "nominations"]
      }
    },
    "parts": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "This value should be the same for all films that are considered to be interconnected."
        },
        "part": {
          "type": "number",
          "description": "Order within related films"
        }
      }
    }
  }
}

```

## Tools

There is the **create-db.js** script in the root of the project that help to build "database". Run this script to bring together all JSONs from the DB folder into one file.