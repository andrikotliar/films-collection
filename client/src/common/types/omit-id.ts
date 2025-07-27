type Entity = {
  id: number;
  [key: string]: unknown;
};

export type OmitId<T extends Entity> = Omit<T, 'id'>;
