import z from 'zod';

export const getBoolFromQuery = z.preprocess((v) => {
  if (typeof v === 'boolean') {
    return v;
  }

  if (v === 'true') {
    return true;
  }

  if (v === 'false') {
    return false;
  }
}, z.boolean());
