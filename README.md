# Films Collection

The personal collection of favorite films.

## Tech Stack

- React
- TypeScript
- JSON

## Database

Currently data stores in plain JSON-files by path:
[/db](https://github.com/andrikotliar/films-collection/tree/main/db).

When you run `npm start` or `npm run build` commands, the `create-db.js` script
bring together all files into one `database.json` file. The app fetches this
file on the initial load.

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

It will install all required packages, create the "database" file and start the
development server.

Or run following commands to build project for the production:

```bash
npm install
npm run build
```

## Tools

There is the **create-db.js** script in the root of the project that help to
build "database". Run this script to bring together all JSONs from the DB folder
into one file.
