import fs from 'fs';

const writeData = (data, path) => {
  fs.writeFileSync(path, JSON.stringify(data, undefined, 2), 'utf-8');
};

export { writeData };
