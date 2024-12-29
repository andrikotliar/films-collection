/**
 * @param {string} value
 * @returns {string[]}
 */
export const parseArrayParameter = (value) => {
  return value.split(',').map((item) => item.trim());
};
