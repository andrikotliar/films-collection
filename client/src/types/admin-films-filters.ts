export type BaseAdminFilmsFilters = {
  q: string;
  priorities: number[];
  sortingField: string;
  sortingDirection: string;
};

export type AdminFilmsQueryFilters = Partial<
  BaseAdminFilmsFilters & {
    pageIndex: number;
  }
>;

export type AdminFilmsServerFilters = Partial<
  BaseAdminFilmsFilters & {
    skip: number;
  }
>;
