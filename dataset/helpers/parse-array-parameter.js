/**
 * @param {string} value
 * @returns {string[]}
 */
const parseArrayParameter = (value) => {
  return value.split(',');
};

export { parseArrayParameter };
