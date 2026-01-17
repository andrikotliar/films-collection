export type FileDestination = 'posters';

export type FileUploadPayload<F> = {
  title: string;
  destination: FileDestination;
  file: F;
  shouldUseUniqueIdentifier?: boolean;
};
