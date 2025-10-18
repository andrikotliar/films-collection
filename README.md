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

1. In the project root, run `pnpm i` to install dependencies for both the frontend and backend.
2. Create `.env` files in the `apps/api` and `apps/web` directories following examples from the `./apps/api/.env.sample` and `./apps/web/.env.sample` respectively.
3. Run `pnpm db:start` to spin up a database.
4. Run `pnpm db:init` in the root. It will run migrations.
5. In the project's root run `pnpm dev` to start the application.

The application requires poster images. It can work without them, but you will see a placeholder instead of film posters.

Put images into a [Cloudinary](https://cloudinary.com/) storage. The film schema has property `poster` which should contain path to the file.

The backend supports uploading images from the admin page only to the Cloudinary, but you can put your images in any storage that provides direct links to start working on the frontend part of the app. You can even put images in the `public` directory and set the environment variable `VITE_BASE_MEDIA_URL=http://localhost:8080` in the `apps/web/.env` file.

## Build project

### Local mode

1. Run `pnpm build` in the project's root. The script builds the backend to the `./apps/api/dist` directory and frontend to the `./apps/api/dist/public`

2. Run `node apps/api/dist/server.js` to start the application

3. Open the app `http://localhost:5000`

### Container mode

1. Fill the `.env.prod` file in the `apps/api` folder based on the `.env.sample`

1. Run `pnpm build:container`. It will build the app and spin up the database.

2. Open the app `http://localhost:5000`
