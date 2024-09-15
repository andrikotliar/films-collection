import fs from 'node:fs';

const getFilesList = async (folderPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (error, files) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(files);
    });
  });
};

export { getFilesList };
