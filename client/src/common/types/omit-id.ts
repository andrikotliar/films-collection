type Entity = {
  id: number | string;
  [key: string]: unknown;
};

export type OmitId<T extends Entity> = Omit<T, 'id'>;
