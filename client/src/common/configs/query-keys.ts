export const queryKeys = {
  collectionEvent: {
    adminList: ['collection-events-admin-list'],
  },
  initialData: {
    config: ['initial-data'],
  },
  collections: {
    list: ['collections', 'list'],
  },
  countries: {
    list: ['countries', 'list'],
  },
  genres: {
    list: ['genres', 'list'],
  },
  people: {
    adminList: ['admin', 'people', 'list'] as const,
  },
  studios: {
    list: ['studios', 'list'],
  },
};
