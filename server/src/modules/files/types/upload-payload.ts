export type FileDestination = 'posters' | 'awards' | 'actors' | 'decoration';

export type UploadPayload = {
  title: string;
  destination: FileDestination;
  file: Buffer;
};
