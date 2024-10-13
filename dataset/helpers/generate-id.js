const ID_LENGTH = 24;
const RADIX = 16;

const generateHexString = () => {
  let hex = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    hex += Math.floor(Math.random() * RADIX).toString(RADIX);
  }
  return hex;
};

export { generateHexString };
