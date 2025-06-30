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

1. In the project root, run `npm run install` to install dependencies for both the client and server.
2. Create `.env` files in the `root`, `server` and `client` directories following examples from the `./env.sample.txt`, `./server/env.sample.txt` and `./client/env.sample.txt` respectively.
3. Run `docker compose up -d` to spin up a database. It will take variables defined in the root `.env`
4. Run `npm run db:init` in the root. It will run migration and seed data from the `dataset` folder. If you don't want to seed the database, run `npm run db:migration` instead.
5. In the project's root run `npm run dev` to start the application.

The application has different images like posters or award images. It can work without them, but you will see placeholders in all places where images are used.

Put images into a [Cloudinary](https://cloudinary.com/) storage. The dataset provides specific paths for each image, e.g.: `posters/movie_title.webp` or `awards/award_title.svg`, therefor the storage should follow strict structure of directories:
- posters/
- awards/
- actors/

The backend support uploading images from the admin page only to the Cloudinary, but you can put your images in any storage that provides direct links to start working on the public part of the app. You can even put images in the `public` directory and set the environment variable `VITE_BASE_MEDIA_URL=http://localhost:8080` in the `client/.env` file. Folder structure should follow the same rules.

## Build project

1. Run `npm run build` in the project's root. The command builds the code into `client/dist` and `server/dist`.

The backend is ready to deploy to fly.io, see [docs](https://fly.io/docs/launch/deploy/)

## Dataset

The dataset folder contains data to populate a database. It consists of two folders:

1. general - collection of base data required for films (genres, countries etc.)
2. films - JSON files containing film information. The folder includes a `_schema.json` file, which explains each field in the JSON files and validates them.

To ensure proper seeding, general data should be populated before adding films, as film JSONs contain references to that data.

An example of a seeding script can be found in `server/prisma/seed.ts`. It uses Prisma ORM, but the data can be adapted for other popular ORMs, some of which support seeding data with nested relations out of the box.