# Films Collection

A personal list of films with manually collected data. The app primarily focuses on representing basic film data and some of the author's subjective perspectives, such as ratings, collections, and comments.

## Frontend

### Tech stack

- React
- Vite
- TypeScript
- TanStack Router
- TanStack Query
- React Hook Form
- Zod

### API client

The API client is automatically generated from the backend API endpoints. It's built on the dev server startup or can be manually built by running the command in the root of the project:

```bash
pnpm api:generate
```

### Images

The `poster` column in the `films` table contains image paths. To display them on the frontend put images in any storage that can serve public URLs and support folders.

Define `VITE_IMAGES_URL` in the `.env` file at the root of the `apps/web`. The variable should be a base public URL.

Poster starts with the `posters` prefix and follows by the image name.

## Backend

### Tech stack

- Fastify
- PostgreSQL
- TypeScript
- Docker
- Drizzle
- Zod

### Routers

To build a type safe router, use the `createRouter` and `defineRoute` helpers. The `defineRoute` helpers takes into account schemas to properly type request parameters (body, query string) and endpoint response. The response schema is required.

This helpers simply process of generating the API client for the frontend.

The client can be generated from the root of the `api` folder by running the command:

```bash
pnpm api:generate
```

## Development server

### Prerequisites

1. Node 20+
2. Docker
3. Cloudinary account

### Start dev server

1. In the project root, run `pnpm install` to install dependencies for both the frontend and backend.
2. Create `.env` file in the `apps/api` directory following the `./apps/api/.env.sample`.
3. In the project's root run `pnpm dev` to start the application. It automatically run all necessary commands for the DEV server:
- spin up a database in the docker container;
- run pending migrations;
- build the API client;
- start frontend and backend;

## Build project

### Local mode

1. Run `pnpm build` in the project's root. The script builds the backend to the `./apps/api/dist` directory and frontend to the `./apps/api/dist/public`

2. Run `node apps/api/dist/server.js` to start the application

3. Open the app `http://localhost:5000`

### Container mode

1. Fill the `.env` file in the `apps/api` folder based on the `.env.sample`

1. Run `pnpm build:container`. It will build the app and spin up the database.

2. Open the app `http://localhost:5000`


## Database

### Data

The `apps/api/data` directory contains JSON data with all essential information to seed the database. The data reflects current state of the films collection app and data is update once a week.

To populate the database with the data, run the following command from the project's root:

```shell
pnpm db:init
```

To initialize the empty database without data, run the command:

```shell
pnpm db:init:empty
```

### Backup database

```shell
docker run --rm \
  -v "$PWD:/dump" \
  postgres:17-bookworm \
  pg_dump "postgresql://USER:PASSWORD@HOST:5432/DBNAME" \
  -F c \
  -f /dump/db.dump
```

### Restore database

```shell
docker run --rm \
  -v "$PWD:/dump" \
  postgres:17-bookworm \
  pg_restore \
    -d "postgresql://USER:PASSWORD@HOST:5432/DATABASE" \
    -v /dump/db.dump
```

### Migrations

1. Update `apps/api/src/database/schema.ts` file.
2. Navigate to the `apps/api` folder.
3. Run `pnpm db:migration:gen --name specify_migration_name` to create migration file from the latest changes.
4. Run `pnpm db:migration:apply` to apply changes to the database.

### Localstack

Start the localstack container

```shell
docker compose up s3_local -d
```

Create a bucket (AWS CLI should be installed):

```shell
aws --endpoint-url=http://localhost:45661 s3 mb s3://films-collection-assets
```

List bucket objects:

```shell
aws --endpoint-url=http://localhost:45661 s3 ls s3://films-collection-assets
```

Copy posters to the bucket

```shell
aws --endpoint-url=http://localhost:45661 s3 sync _LOCAL_PATH_ s3://films-collection-assets/posters
```

Public URL example: `http://localhost:45661/films-collection-assets/avatar.webp`