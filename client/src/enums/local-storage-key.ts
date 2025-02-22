const LocalStorageKey = {
  LAST_VISITED_FILMS: 'LAST_VISITED_FILMS',
  IS_AUTHENTICATED: 'IS_AUTHENTICATED',
} as const;

export type LocalStorageKey = keyof typeof LocalStorageKey;
