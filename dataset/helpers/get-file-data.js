import fs from 'node:fs';

const getFileData = async (path) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error.message ?? `Failed processing file ${path}`);
        return;
      }

      try {
        const parsedData = JSON.parse(data);

        resolve(parsedData);
      } catch (error) {
        reject(error?.message ?? `Error while processing file data in ${path}`);
      }
    });
  });

  return promise;
};

export { getFileData };
