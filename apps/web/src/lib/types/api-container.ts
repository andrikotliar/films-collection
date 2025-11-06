export type ApiContainer = {
  create: (data: any) => Promise<unknown>;
  update: (id: number, data: any) => Promise<unknown>;
};
