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

To create data for the new film, use the [Film Builder](https://filmscollection.netlify.app/admin) GUI.

## Film data details

The detailed explanation of each field in JSON-files is available by [the link](https://filmscollection.netlify.app/info#details).

## Tools

There are two node scripts in the root of the project that help to build "database":

- **create-db.js** - the main script that runs on app start and build. It brings together all JSONs from the DB folder into one JSON-file.
- **create-statistic.js** - create data for the statistic page *(in progress)*.