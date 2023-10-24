# Films Collection Application

The application is developed as my personal collection of favorite films.

All information, posters and videos were taken from open resources.

## Data

All data stores in json-files, that are combined into the **database.json** file
after the build or start command is run.

To build your own version of the list, clone the project:

```bash
git clone git@github.com:andrikotliar/filmscollection.git
cd filmscollection
```

Add films data files to the DB folder and then run commands:

```bash
npm install
npm start
```

It will install all required packages, create the "database" file and start the
development server.

Or run following commands to build project for the production:

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
    "media": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "poster": {
            "type": "string",
            "description": "Full poster url"
          },
          "trailer": {
            "type": "string",
            "description": "Youtube video ID"
          },
          "caption": {
            "type": "string",
            "description": "Short description on the current poster. Appears only on the posters slider"
          }
        },
        "required": ["poster", "trailer"]
      },
      "description": "Youtube video IDs for Film and Animation types."
    },
    "summary": {
      "type": "object",
      "properties": {
        "sections": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "Paragraph title, usually present only for series where defines season title."
              },
              "text": {
                "type": "string",
                "description": "Short movie description"
              }
            },
            "required": ["text"]
          },
          "description": "Array of paragraphs for the movie description section"
        },
        "required": ["sections"]
      }
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
      "description": "Release year. Release of the first season for series."
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
    "boxOffice": {
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
    "chapters": {
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
      },
      "required": ["title", "part"]
    },
    "series": {
      "type": "object",
      "properties": {
        "episodesTotal": {
          "type": "number",
          "description": "Number of episodes across a series"
        },
        "seasons": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "number": {
                "type": "number",
                "description": "The number of a season"
              },
              "episodesCount": {
                "type": "number",
                "description": "Number of episodes in the particular season"
              },
              "year": {
                "type": "number",
                "description": "Year a season was released"
              }
            },
            "required": ["number", "poster", "trailer", "episodesCount", "year"]
          }
        }
      },
      "required": ["episodesTotal", "seasons"]
    }
  }
}

```

## Tools

There is the **create-db.js** script in the root of the project that help to
build "database". Run this script to bring together all JSONs from the DB folder
into one file.
