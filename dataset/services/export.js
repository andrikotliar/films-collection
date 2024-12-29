import { getFilters } from '../helpers/get-filters.js';
import { getSorting } from '../helpers/get-sorting.js';
import { writeSingleFile } from '../helpers/write-single-file.js';
import { writeMultipleFiles } from '../helpers/write-multiple-files.js';

const defaultParams = {
  outputFolder: './exports',
  resultMode: 'single',
  limit: 0,
  skip: 0,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const exportDataFromDatabase = async ({ cliParams, database }) => {
  if (!cliParams.srcCollection) {
    throw new Error(`[--src-collection] is required param`);
  }

  const options = {
    ...defaultParams,
    ...cliParams,
  };

  const collection = database.collection(options.srcCollection);
  const filters = getFilters(cliParams);
  const sorting = getSorting(options.sortBy, options.sortOrder);

  const data = await collection
    .find(filters)
    .limit(options.limit)
    .skip(options.skip)
    .sort(sorting)
    .toArray();

  if (!data.length) {
    throw new Error('Data not found');
  }

  switch (options.resultMode) {
    case 'single': {
      await writeSingleFile({
        collectionName: cliParams.srcCollection,
        data,
        path: options.outputFolder,
      });
      break;
    }
    case 'multiple': {
      await writeMultipleFiles({
        data,
        path: options.outputFolder,
      });
      break;
    }
    default:
      throw new Error('Result Mode unknown');
  }
};
