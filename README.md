# Films Collection

The personal collection of favorite films.

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- *React Hook Form*
- *React Query*
- *Lucide Icons*
- *React Router Dom v6*

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

To prepopulate the database with data, go to the `dataset` folder and follow instructions in the `README`.

## Build project

1. Run the `npm run build` in the root of the project. It will build code into `client/dist` and `server/dist`.

In the `server` folder you can find production-ready `Dockerfile` to deploy the backend. 
