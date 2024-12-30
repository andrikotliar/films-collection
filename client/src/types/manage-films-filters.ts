export type BaseManageFilmsFilters = {
  q: string;
  priorities: number[];
  sortingField: string;
  sortingDirection: string;
};

export type ManageFilmsQueryFilters = Partial<
  BaseManageFilmsFilters & {
    pageIndex: number;
  }
>;

export type ManageFilmsServerFilters = Partial<
  BaseManageFilmsFilters & {
    skip: number;
  }
>;
