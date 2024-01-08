import fs from 'node:fs';
import path from 'node:path';
import { modifier } from './modifier.js';

const DATA_FOLDER = './db';
const files = fs.readdirSync(DATA_FOLDER);
const shouldWriteData = process.argv[1] === 'write';

const readData = (file) => {
  try {
    const fileData = fs.readFileSync(path.join(DATA_FOLDER, file), 'utf-8');
    const parsedData = JSON.parse(fileData);

    return parsedData;
  } catch (e) {
    throw Error(e?.message);
  }
};

const writeData = (file, data) => {
  try {
    fs.writeFileSync(
      path.join(DATA_FOLDER, file),
      JSON.stringify(data, undefined, 2),
      'utf-8',
    );
  } catch (e) {
    throw Error(e?.message);
  }
};

const modifyData = (fileNames, shouldWriteData) => {
  fileNames.forEach((fileName) => {
    const data = readData(fileName);

    const modifiedData = modifier(data);

    if (shouldWriteData) {
      writeData(fileName, modifiedData);
    }
  });
};

modifyData(files, shouldWriteData);
