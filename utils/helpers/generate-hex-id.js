const generateHexId = () => {
  let hexId = '';

  for (let i = 0; i < 24; i++) {
    hexId += Math.floor(Math.random() * 16).toString(16);
  }

  return hexId;
};

export { generateHexId };
