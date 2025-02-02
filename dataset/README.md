To populate MongoDB database with predefined data, follow this three steps:

1. Run the `npm install` command to install required dependencies.

2. Fill `.env` file with variables defined in the `env.sample.txt` file. Essentially it's MongoDB URI and your database name.

3. Run the `node fc insert` command to insert all required data into the database.

The script creates several collections in the database:

- **films**
- **actors**
- **chapters**
- **awards**
- **lists**
- **collections**

To populate only specified collections, add the `--collections` parameter with comma-separated collection names:

```bash
node fc insert --collections "films, chapters"
```

To change an environment file, specify the `--env` parameter:

```bash
node fc insert --env .env.prod
```

To delete collections replace the `insert` command with the `delete` one.

```bash
node fc delete --collections "films, actors" --env .env.test
```
If none of the parameters are specified, defaults will be used. For the environment file it's the `.env` and for collections all available.

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
  },
  {
    "fileMatch": [
      "/dataset/data/supporting/collections.json"
    ],
    "url": "./dataset/schemas/collections.schema.json"
  }
]
```

## Export

To export data from the database run the script:

```bash
node fc export --src-collection COLLECTION_NAME --output-folder DESTINATION_PATH --result-mode single
```

Available parameters:

- `--src-collection` - required, defines source collection.
- `--output-folder` - destination folder, where file(s) will be saved. Default `./exports` (relative folder to the `dataset`).
- `--result-mode` - accepts one of values: `single` or `multiple`. Default `single`. The script writes data to a single or multiple files based on a mode value.

Filters:

- `--from-date` - filter by the `createdAt` field after or equal to the date.
- `--to-date` - filter by the `createdAt` field before or equal to the date.
- `--limit` - limit number of items. Default `0`.
- `--skip` - skip number of items. Default `0`.
- `--search` - filter items by a search string, case insensitive. It supports collections that have a `title` field.
- `--id` - filter by the `_id` field.

Sorting:

- `--sort-by` - sorting field. Default `createdAt`.
- `--sort-order` - order direction, accepts `asc` or `desc` values. Default `desc`.