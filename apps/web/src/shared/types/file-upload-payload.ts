import type { FileDestination } from '../enums';

export type FileUploadPayload = {
  title: string;
  file: File;
  destination: FileDestination;
  shouldUseUniqueIdentifier?: boolean;
};
