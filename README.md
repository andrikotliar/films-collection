# Films Collection Application

The application is developed as my personal collection of favorite films.

All information, posters and videos was taken from open internet resources. Actor photos loads from [the TMDB](https://www.themoviedb.org/) directly.

Source code of the app: [https://github.com/andrikotliar/filmscollection](https://github.com/andrikotliar/filmscollection)

## Data

All data stores in simple json-files. They are combined in the single JSON-file during building by using node-script.

To build your own version of the list, you need to clone the project:

```bash
git clone git@github.com:andrikotliar/filmscollection.git
cd filmscollection
```

Add or delete some films form the db folder and then run commands:

```bash
npm install
npm start
```
It will install all required packages and start the development server.

Or run following commads to build project for the production:

```bash
npm install
npm run build
```

To create data for the new film you can use the [Film Builder](https://filmscollection.netlify.app/admin) GUI


The film data has the following schema: [film-schema.json](https://github.com/andrikotliar/films-collection/blob/main/src/film-schema.json);

## Tools

There are two node scripts in the root of the project that help to build "database":

- **create-db.js** - the main script that runs on app start and build. It brings together all JSONs from the DB folder into one JSON-file.
- **create-statistic.js** - create data for the statistic page *(in progress)*.