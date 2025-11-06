import { FilmsListFilters } from '~/lib';
import { ListOption } from './list-option';
import { ReactNode } from 'react';

export type CheckboxFilter = {
  id: keyof FilmsListFilters;
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
  id: keyof FilmsListFilters;
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
