import type { ReactNode } from 'react';
import type { ListOption } from '@films-collection/shared';
import type { ExtractParams } from '~/shared/types/extract-params';
import type { api } from '~/shared/services';

type FilterIds = keyof ExtractParams<typeof api.films.list>['queryParams'];

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
  icon?: ReactNode;
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
