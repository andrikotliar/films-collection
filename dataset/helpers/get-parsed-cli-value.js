import { InvalidVariantError } from '../configs/errors.js';
import { validateVariants } from './validate-variants.js';
import { parseArrayParameter } from './parse-array-parameter.js';

export const getParsedCliValue = ({ value, config, key }) => {
  if (config.type === 'array') {
    if (typeof value !== 'string') {
      throw new Error(`${key} should be a string, e.g.: "value_1, value_2"`);
    }

    return parseArrayParameter(value);
  }

  if (config.type === 'number') {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`Invalid value for ${key}. Not valid number`);
    }

    const parsedValue = Number(value);

    const isAllowed = validateVariants(parsedValue, config.variants);

    if (!isAllowed) {
      throw new InvalidVariantError(key, config.variants);
    }

    return parsedValue;
  }

  if (config.type === 'string') {
    if (typeof value !== 'string') {
      throw new Error(`${value} is not valid for ${key}`);
    }

    const isAllowed = validateVariants(value, config.variants);

    if (!isAllowed) {
      throw new InvalidVariantError(key, config.variants);
    }

    return value;
  }

  return null;
};
