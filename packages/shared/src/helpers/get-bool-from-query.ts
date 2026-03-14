import z from 'zod';

export const getBoolFromQuery = z.preprocess((v) => {
  if (typeof v === 'boolean') {
    return v;
  }

  if (typeof v === 'string') {
    const lower = v.toLowerCase();

    if (lower === 'true') {
      return true;
    }

    if (lower === 'false') {
      return false;
    }

    return undefined;
  }
  return undefined;
}, z.boolean().optional());
