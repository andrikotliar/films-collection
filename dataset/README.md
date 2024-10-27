To populate MongoDB database with predefined data, follow this three steps:

1. Run the `npm install` command to install required dependencies.

2. Fill `.env` file with variables defined in the `env.sample.txt` file. Essentially it's MongoDB URI and your database name.

3. Run the `node insert-all` command to insert all required data into the database.

The script creates 4 collections in the database:

- **films**
- **actors**
- **chapters**
- **awards**
- **lists**

To populate a single collection, run the `insert-one` script with collection name as a parameter.

```bash
node insert-one COLLECTION_NAME
```

## Data

All seeding data are in the `data` folder. Delete or add the data to fit your likes. All data should follow schemas defined in the `schemas` folder. You can apply JSON schema validations by following simple steps:

1. Create if you don't have `.vscode` folder in the root of the project.
2. Inside this folder, create the `settings.json` file. The file is object with configuration.
3. Add the following configuration:

```json
"json.schemas": [
  {
    "fileMatch": [
      "/dataset/data/films/*.json"
    ],
    "url": "./dataset/schemas/film.schema.json"
  },
  {
    "fileMatch": [
      "/dataset/data/supporting/actors.json"
    ],
    "url": "./dataset/schemas/actors.schema.json"
  },
  {
    "fileMatch": [
      "/dataset/data/supporting/chapters.json"
    ],
    "url": "./dataset/schemas/chapters.schema.json"
  },
  {
    "fileMatch": [
      "/dataset/data/supporting/awards.json"
    ],
    "url": "./dataset/schemas/awards.schema.json"
  },
  {
    "fileMatch": [
      "/dataset/data/supporting/lists.json"
    ],
    "url": "./dataset/schemas/lists.schema.json"
  }
]
```