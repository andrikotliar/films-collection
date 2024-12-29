export const cliConfig = {
  commands: ['insert', 'delete', 'export'],
  paramsMap: {
    '--env': {
      prop: 'envFile',
      type: 'string',
    },
    '--collections': {
      prop: 'collections',
      type: 'array',
    },
    '--src-collection': {
      prop: 'srcCollection',
      type: 'string',
    },
    '--output-folder': {
      prop: 'outputFolder',
      type: 'string',
    },
    '--result-mode': {
      prop: 'resultMode',
      type: 'string',
      variants: ['single', 'multiple'],
    },
    '--from-date': {
      prop: 'fromDate',
      type: 'string',
    },
    '--to-date': {
      prop: 'toDate',
      type: 'string',
    },
    '--id': {
      prop: 'id',
      type: 'string',
    },
    '--limit': {
      prop: 'limit',
      type: 'number',
    },
    '--skip': {
      prop: 'skip',
      type: 'number',
    },
    '--search': {
      prop: 'search',
      type: 'string',
    },
    '--sort-by': {
      prop: 'sortBy',
      type: 'string',
    },
    '--sort-order': {
      prop: 'sortOrder',
      type: 'string',
      variants: ['asc', 'desc'],
    },
  },
};
