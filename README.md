# Films Collection

The personal collection of favorite films.

## Tech Stack

- React
- TypeScript
- JSON

### Additional Libraries

- React Hook Form
- Axios
- Lucide Icons 

## Data

Currently data is stored as plain JSON-files in the `db` folder.

When you run `npm start` or `npm run build` commands, the `utils/generate-db.js` script brings together all files from the `db` folder into the single `database.json` file. The app fetches this file on the initial load..

The `utils` folder contains several scripts that help to manage local data.

## Build

To build your own version of the list, clone the project:

```bash
git clone git@github.com:andrikotliar/films-collection.git
cd films-collection
```

Add films data files to the DB folder and then run commands:

```bash
npm install
npm start
```

Or run following commands to build project for the production:

```bash
npm install
npm run build
```
