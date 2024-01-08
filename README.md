# Films Collection

The personal collection of favorite films.

## Tech Stack

- React
- TypeScript
- JSON

## Database

Currently data stores in plain JSON-files in the `db` folder.

When you run `npm start` or `npm run build` commands, the `generate-db.js` script bring together all files into one `database.json` file. The app fetches this file on the initial load. You can find this script in the `utils` folder.

The `utils` folder contains several other scripts that help to manage local data.

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

It will install all required packages, create the "database" file and start the development server.

Or run following commands to build project for the production:

```bash
npm install
npm run build
```
