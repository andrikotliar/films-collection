export type FileDestination = 'posters';

export type UploadPayload = {
  title: string;
  destination: FileDestination;
  file: Buffer;
  shouldUseUniqueIdentifier?: boolean;
};
