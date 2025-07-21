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
2. Create `.env` files in the `server` and `client` directories following examples from the `./server/.env.sample` and `./client/.env.sample` respectively.
3. Run `npm run start:db` to spin up a database.
4. Run `npm run db:init` in the root. It will run migrations.
5. In the project's root run `npm run dev` to start the application.

The application requires poster images. It can work without them, but you will see a placeholder instead of film posters.

Put images into a [Cloudinary](https://cloudinary.com/) storage. The films dataset has property `poster` which contains path to the file. To work properly images should have the same path.

The backend support uploading images from the admin page only to the Cloudinary, but you can put your images in any storage that provides direct links to start working on the public part of the app. You can even put images in the `public` directory and set the environment variable `VITE_BASE_MEDIA_URL=http://localhost:8080` in the `client/.env` file.

## Build project

### Local mode

1. Run `npm run build` in the project's root. The script builds the backend to the `./server/dist` directory and frontend to the `./server/dist/public`

2. Run `node server/dist/server.js` to start the application

3. Open the app `http://localhost:5000`

### Container mode

1. Run `npm run start:prod`. It will build the app and spin up the database.

2. Open the app `http://localhost:5000`
