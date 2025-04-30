const LocalStorageKey = {
  LAST_VISITED_FILMS: 'LAST_VISITED_FILMS',
  IS_AUTHENTICATED: 'IS_AUTHENTICATED',
  IS_CONSOLE_MENU_OPEN: 'IS_CONSOLE_MENU_OPEN',
  FILM_DRAFT: 'FILM_DRAFT',
} as const;

export type LocalStorageKey = keyof typeof LocalStorageKey;
