/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as FilmFilmIdImport } from './routes/film/$filmId'

// Create Virtual Routes

const StatisticRouteLazyImport = createFileRoute('/statistic')()
const ConsoleRouteLazyImport = createFileRoute('/console')()
const AboutRouteLazyImport = createFileRoute('/about')()

// Create/Update Routes

const StatisticRouteLazyRoute = StatisticRouteLazyImport.update({
  id: '/statistic',
  path: '/statistic',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/statistic/route.lazy').then((d) => d.Route),
)

const ConsoleRouteLazyRoute = ConsoleRouteLazyImport.update({
  id: '/console',
  path: '/console',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/console/route.lazy').then((d) => d.Route))

const AboutRouteLazyRoute = AboutRouteLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/route.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const FilmFilmIdRoute = FilmFilmIdImport.update({
  id: '/film/$filmId',
  path: '/film/$filmId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/film/$filmId.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/console': {
      id: '/console'
      path: '/console'
      fullPath: '/console'
      preLoaderRoute: typeof ConsoleRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/statistic': {
      id: '/statistic'
      path: '/statistic'
      fullPath: '/statistic'
      preLoaderRoute: typeof StatisticRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/film/$filmId': {
      id: '/film/$filmId'
      path: '/film/$filmId'
      fullPath: '/film/$filmId'
      preLoaderRoute: typeof FilmFilmIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRouteLazyRoute
  '/console': typeof ConsoleRouteLazyRoute
  '/statistic': typeof StatisticRouteLazyRoute
  '/film/$filmId': typeof FilmFilmIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRouteLazyRoute
  '/console': typeof ConsoleRouteLazyRoute
  '/statistic': typeof StatisticRouteLazyRoute
  '/film/$filmId': typeof FilmFilmIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRouteLazyRoute
  '/console': typeof ConsoleRouteLazyRoute
  '/statistic': typeof StatisticRouteLazyRoute
  '/film/$filmId': typeof FilmFilmIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/console' | '/statistic' | '/film/$filmId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/console' | '/statistic' | '/film/$filmId'
  id: '__root__' | '/' | '/about' | '/console' | '/statistic' | '/film/$filmId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRouteLazyRoute: typeof AboutRouteLazyRoute
  ConsoleRouteLazyRoute: typeof ConsoleRouteLazyRoute
  StatisticRouteLazyRoute: typeof StatisticRouteLazyRoute
  FilmFilmIdRoute: typeof FilmFilmIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRouteLazyRoute: AboutRouteLazyRoute,
  ConsoleRouteLazyRoute: ConsoleRouteLazyRoute,
  StatisticRouteLazyRoute: StatisticRouteLazyRoute,
  FilmFilmIdRoute: FilmFilmIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/console",
        "/statistic",
        "/film/$filmId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about/route.lazy.tsx"
    },
    "/console": {
      "filePath": "console/route.lazy.tsx"
    },
    "/statistic": {
      "filePath": "statistic/route.lazy.tsx"
    },
    "/film/$filmId": {
      "filePath": "film/$filmId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */