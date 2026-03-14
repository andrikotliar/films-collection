import z from 'zod';

export const getBoolFromQuery = z.preprocess((v) => {
  if (typeof v === 'boolean') {
    return v;
  }
  if (typeof v === 'number') {
    return v === 1;
  }
  if (typeof v === 'string') {
    const lower = v.toLowerCase();
    if (lower === 'true' || lower === '1') {
      return true;
    }
    if (lower === 'false' || lower === '0') {
      return false;
    }
  }
  return undefined;
}, z.boolean().optional());
