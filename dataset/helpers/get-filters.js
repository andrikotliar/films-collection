import { ObjectId } from 'mongodb';

export const getFilters = (params) => {
  const filters = {};

  if (params.id) {
    filters._id = ObjectId.createFromHexString(params.id);
  }

  if (params.fromDate || params.toDate) {
    filters.createdAt = {};

    if (params.fromDate) {
      filters.createdAt = {
        $gte: new Date(params.fromDate),
      };
    }

    if (params.toDate) {
      filters.createdAt = {
        $lte: new Date(params.toDate),
      };
    }
  }

  if (params.search) {
    filters.title = {
      $regex: params.search,
      $options: 'i',
    };
  }

  return filters;
};
