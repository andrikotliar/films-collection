# Films Collection

The personal collection of favorite films.

![Films Collection Main Page Preview](./preview.jpg)

> ❗ DISCLAIMER: All media files, videos, and information are the intellectual property of its authors. All data was taken from open sources and used for informational purposes. Data was gathered manually without using scrappers or third-party APIs.

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
- MongoDB
- TypeScript
- Docker
- *SWC*
- *Mongoose*
- *tsx*

## Start development server

1. Go to the server folder and create `.env` file. Copy all required variables from the `env.sample.txt`.
2. Repeat step 1 for the `client` folder.
3. In the root of the project run the `npm run install:all` command. It will install dependencies in the client and server folders.
4. In the root run the `npm run dev`. It will start both client and server via `concurrently`.
5. Open `http://localhost:3030`

The `dataset` folder contains data that can be used to populate database.

## Build project

1. Run the `npm run build` in the root of the project. The command builds the code into `client/dist` and `server/dist`.