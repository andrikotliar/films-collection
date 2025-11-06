import { SortingOrder } from './sorting-order';

export type BaseAdminFilmsFilters = {
  q?: string | null;
  priorities: number[];
  order: SortingOrder;
  orderKey: string;
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
