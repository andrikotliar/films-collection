import type { ListOption } from '@films-collection/shared';
import type { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types/extract-params';

type FilterIds = keyof QueryParams<typeof api.films.list>;

export type CheckboxFilter = {
  id: FilterIds;
  type: 'checkmark';
  options: ListOption<string | number>[];
  inputType: 'checkbox' | 'radio';
};

export type DateFilterInput = {
  id: string;
  label: string;
};

export type DateFilter = {
  type: 'daterange';
  inputs: {
    start: DateFilterInput;
    end: DateFilterInput;
  };
};

export type NestedFiltersOption = {
  id: FilterIds;
  label: string;
  icon?: React.ReactNode;
};

export type NestedFilters = {
  id: string;
  type: 'nested';
  options: NestedFiltersOption[];
};

export type FilterTypes = CheckboxFilter | DateFilter | NestedFilters;

export type FilterItem = {
  title: string;
} & FilterTypes;
