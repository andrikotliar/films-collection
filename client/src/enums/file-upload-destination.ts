export const FileUploadDestination = {
  POSTERS: 'posters',
  ACTORS: 'actors',
  AWARDS: 'awards',
  DECORATION: 'decoration',
} as const;

export type FileDestination =
  (typeof FileUploadDestination)[keyof typeof FileUploadDestination];
