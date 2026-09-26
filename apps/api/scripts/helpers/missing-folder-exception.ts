type Params = {
  basePath: string;
  destination: string;
};

export class MissingFolderException extends Error {
  constructor({ basePath, destination }: Params) {
    super(`Expected ${basePath} to contain ${destination}`);
  }
}
