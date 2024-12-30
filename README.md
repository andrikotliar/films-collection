# Films Collection

The personal collection of favorite films.

![Films Collection Main Page Preview](./preview.jpg)

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

To seed the database with data, go to the `dataset` folder and follow instructions in the `README`.

## Build project

1. Run the `npm run build` in the root of the project. The command builds the code into `client/dist` and `server/dist`.