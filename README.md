# Films Collection

A personal list of films with manually collected data. The app primarily focuses on representing basic film data and some of the author's subjective perspectives, such as ratings, collections, and comments.

![Films Collection Main Page Preview](./preview.jpg)

> ❗ DISCLAIMER: All media files, videos, and information are the intellectual property of their respective authors. All data has been sourced from open sources and is used for informational purposes only. The data was gathered manually without the use of scrapers or third-party APIs.

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- *TanStack Router*
- *TanStack Query*
- *React Hook Form*
- *Lucide Icons*

### Backend

- Fastify
- PostgreSQL
- TypeScript
- Docker
- *Prisma*
- *SWC*
- *tsx*

## Start development server

1. Go to the server folder and create `.env` file. Copy all required variables from the `env.sample.txt`.
2. Repeat step 1 for the `client` folder.
3. In the project root, run `npm run install:all` to install dependencies for both the client and server.
4. In the project root run `npm run dev`.  This will start both the client and server using `concurrently`.
5. Open `http://localhost:3030`

## Build project

1. Run `npm run build` in the project root. The command builds the code into `client/dist` and `server/dist`.

The backend is ready to deploy to fly.io, see [docs](https://fly.io/docs/launch/deploy/)

## Dataset

The dataset folder contains data to populate a database. It consists of two folders:

1. `general` - collection of base data:
- genres;
- countries;
- studios;
- collections;
- people - actors, directors, writers etc.;
- awards;
- nominations.

2. `films` - JSON files containing film information. The folder includes a `_schema.json` file, which explains each field in the JSON files and validates them.

To ensure proper seeding, general data should be populated before adding films, as film JSONs contain references to that data.

An example of a seeding script can be found in `server/prisma/seed.ts`. It uses Prisma ORM, but the data can be adapted for other popular ORMs, some of which support seeding data with nested relations out of the box.