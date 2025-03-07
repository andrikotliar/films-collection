/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginRouteImport } from './routes/login/route'
import { Route as ConsoleRouteImport } from './routes/console/route'
import { Route as IndexImport } from './routes/index'
import { Route as FilmFilmIdImport } from './routes/film/$filmId'
import { Route as ConsolePendingRouteImport } from './routes/console/pending/route'
import { Route as ConsoleCollectionEventsRouteImport } from './routes/console/collection-events/route'

// Create Virtual Routes

const StatisticRouteLazyImport = createFileRoute('/statistic')()
const AboutRouteLazyImport = createFileRoute('/about')()
const ConsoleManageRouteLazyImport = createFileRoute('/console/manage')()
const ConsoleAdditionalRouteLazyImport = createFileRoute(
  '/console/additional',
)()

// Create/Update Routes

const StatisticRouteLazyRoute = StatisticRouteLazyImport.update({
  id: '/statistic',
  path: '/statistic',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/statistic/route.lazy').then((d) => d.Route),
)

const AboutRouteLazyRoute = AboutRouteLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/route.lazy').then((d) => d.Route))

const LoginRouteRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login/route.lazy').then((d) => d.Route))

const ConsoleRouteRoute = ConsoleRouteImport.update({
  id: '/console',
  path: '/console',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ConsoleManageRouteLazyRoute = ConsoleManageRouteLazyImport.update({
  id: '/manage',
  path: '/manage',
  getParentRoute: () => ConsoleRouteRoute,
} as any).lazy(() =>
  import('./routes/console/manage/route.lazy').then((d) => d.Route),
)

const ConsoleAdditionalRouteLazyRoute = ConsoleAdditionalRouteLazyImport.update(
  {
    id: '/additional',
    path: '/additional',
    getParentRoute: () => ConsoleRouteRoute,
  } as any,
).lazy(() =>
  import('./routes/console/additional/route.lazy').then((d) => d.Route),
)

const FilmFilmIdRoute = FilmFilmIdImport.update({
  id: '/film/$filmId',
  path: '/film/$filmId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/film/$filmId.lazy').then((d) => d.Route))

const ConsolePendingRouteRoute = ConsolePendingRouteImport.update({
  id: '/pending',
  path: '/pending',
  getParentRoute: () => ConsoleRouteRoute,
} as any).lazy(() =>
  import('./routes/console/pending/route.lazy').then((d) => d.Route),
)

const ConsoleCollectionEventsRouteRoute =
  ConsoleCollectionEventsRouteImport.update({
    id: '/collection-events',
    path: '/collection-events',
    getParentRoute: () => ConsoleRouteRoute,
  } as any).lazy(() =>
    import('./routes/console/collection-events/route.lazy').then(
      (d) => d.Route,
    ),
  )

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
    '/console': {
      id: '/console'
      path: '/console'
      fullPath: '/console'
      preLoaderRoute: typeof ConsoleRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/statistic': {
      id: '/statistic'
      path: '/statistic'
      fullPath: '/statistic'
      preLoaderRoute: typeof StatisticRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/console/collection-events': {
      id: '/console/collection-events'
      path: '/collection-events'
      fullPath: '/console/collection-events'
      preLoaderRoute: typeof ConsoleCollectionEventsRouteImport
      parentRoute: typeof ConsoleRouteImport
    }
    '/console/pending': {
      id: '/console/pending'
      path: '/pending'
      fullPath: '/console/pending'
      preLoaderRoute: typeof ConsolePendingRouteImport
      parentRoute: typeof ConsoleRouteImport
    }
    '/film/$filmId': {
      id: '/film/$filmId'
      path: '/film/$filmId'
      fullPath: '/film/$filmId'
      preLoaderRoute: typeof FilmFilmIdImport
      parentRoute: typeof rootRoute
    }
    '/console/additional': {
      id: '/console/additional'
      path: '/additional'
      fullPath: '/console/additional'
      preLoaderRoute: typeof ConsoleAdditionalRouteLazyImport
      parentRoute: typeof ConsoleRouteImport
    }
    '/console/manage': {
      id: '/console/manage'
      path: '/manage'
      fullPath: '/console/manage'
      preLoaderRoute: typeof ConsoleManageRouteLazyImport
      parentRoute: typeof ConsoleRouteImport
    }
  }
}

// Create and export the route tree

interface ConsoleRouteRouteChildren {
  ConsoleCollectionEventsRouteRoute: typeof ConsoleCollectionEventsRouteRoute
  ConsolePendingRouteRoute: typeof ConsolePendingRouteRoute
  ConsoleAdditionalRouteLazyRoute: typeof ConsoleAdditionalRouteLazyRoute
  ConsoleManageRouteLazyRoute: typeof ConsoleManageRouteLazyRoute
}

const ConsoleRouteRouteChildren: ConsoleRouteRouteChildren = {
  ConsoleCollectionEventsRouteRoute: ConsoleCollectionEventsRouteRoute,
  ConsolePendingRouteRoute: ConsolePendingRouteRoute,
  ConsoleAdditionalRouteLazyRoute: ConsoleAdditionalRouteLazyRoute,
  ConsoleManageRouteLazyRoute: ConsoleManageRouteLazyRoute,
}

const ConsoleRouteRouteWithChildren = ConsoleRouteRoute._addFileChildren(
  ConsoleRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/console': typeof ConsoleRouteRouteWithChildren
  '/login': typeof LoginRouteRoute
  '/about': typeof AboutRouteLazyRoute
  '/statistic': typeof StatisticRouteLazyRoute
  '/console/collection-events': typeof ConsoleCollectionEventsRouteRoute
  '/console/pending': typeof ConsolePendingRouteRoute
  '/film/$filmId': typeof FilmFilmIdRoute
  '/console/additional': typeof ConsoleAdditionalRouteLazyRoute
  '/console/manage': typeof ConsoleManageRouteLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/console': typeof ConsoleRouteRouteWithChildren
  '/login': typeof LoginRouteRoute
  '/about': typeof AboutRouteLazyRoute
  '/statistic': typeof StatisticRouteLazyRoute
  '/console/collection-events': typeof ConsoleCollectionEventsRouteRoute
  '/console/pending': typeof ConsolePendingRouteRoute
  '/film/$filmId': typeof FilmFilmIdRoute
  '/console/additional': typeof ConsoleAdditionalRouteLazyRoute
  '/console/manage': typeof ConsoleManageRouteLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/console': typeof ConsoleRouteRouteWithChildren
  '/login': typeof LoginRouteRoute
  '/about': typeof AboutRouteLazyRoute
  '/statistic': typeof StatisticRouteLazyRoute
  '/console/collection-events': typeof ConsoleCollectionEventsRouteRoute
  '/console/pending': typeof ConsolePendingRouteRoute
  '/film/$filmId': typeof FilmFilmIdRoute
  '/console/additional': typeof ConsoleAdditionalRouteLazyRoute
  '/console/manage': typeof ConsoleManageRouteLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/console'
    | '/login'
    | '/about'
    | '/statistic'
    | '/console/collection-events'
    | '/console/pending'
    | '/film/$filmId'
    | '/console/additional'
    | '/console/manage'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/console'
    | '/login'
    | '/about'
    | '/statistic'
    | '/console/collection-events'
    | '/console/pending'
    | '/film/$filmId'
    | '/console/additional'
    | '/console/manage'
  id:
    | '__root__'
    | '/'
    | '/console'
    | '/login'
    | '/about'
    | '/statistic'
    | '/console/collection-events'
    | '/console/pending'
    | '/film/$filmId'
    | '/console/additional'
    | '/console/manage'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ConsoleRouteRoute: typeof ConsoleRouteRouteWithChildren
  LoginRouteRoute: typeof LoginRouteRoute
  AboutRouteLazyRoute: typeof AboutRouteLazyRoute
  StatisticRouteLazyRoute: typeof StatisticRouteLazyRoute
  FilmFilmIdRoute: typeof FilmFilmIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ConsoleRouteRoute: ConsoleRouteRouteWithChildren,
  LoginRouteRoute: LoginRouteRoute,
  AboutRouteLazyRoute: AboutRouteLazyRoute,
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
        "/console",
        "/login",
        "/about",
        "/statistic",
        "/film/$filmId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/console": {
      "filePath": "console/route.tsx",
      "children": [
        "/console/collection-events",
        "/console/pending",
        "/console/additional",
        "/console/manage"
      ]
    },
    "/login": {
      "filePath": "login/route.tsx"
    },
    "/about": {
      "filePath": "about/route.lazy.tsx"
    },
    "/statistic": {
      "filePath": "statistic/route.lazy.tsx"
    },
    "/console/collection-events": {
      "filePath": "console/collection-events/route.tsx",
      "parent": "/console"
    },
    "/console/pending": {
      "filePath": "console/pending/route.tsx",
      "parent": "/console"
    },
    "/film/$filmId": {
      "filePath": "film/$filmId.tsx"
    },
    "/console/additional": {
      "filePath": "console/additional/route.lazy.tsx",
      "parent": "/console"
    },
    "/console/manage": {
      "filePath": "console/manage/route.lazy.tsx",
      "parent": "/console"
    }
  }
}
ROUTE_MANIFEST_END */
