import type { ListOption } from '@films-collection/shared';

type OnlyStringKey<T> = Extract<keyof T, string>;

type BaseFilter<T extends Record<string, any>> = {
  id: OnlyStringKey<T>;
  title: string;
};

export type CheckboxFilter<T extends Record<string, any>> = BaseFilter<T> & {
  type: 'checkmark';
  options: ListOption<string | number>[];
  inputType: 'checkbox' | 'radio';
};

export type DateFilterInput<T extends Record<string, any>> = {
  id: OnlyStringKey<T>;
  label: string;
};

export type DateFilter<T extends Record<string, any>> = BaseFilter<T> & {
  type: 'daterange';
  inputs: {
    start: DateFilterInput<T>;
    end: DateFilterInput<T>;
  };
};

export type NestedFiltersOption<T extends Record<string, any>> = {
  id: OnlyStringKey<T>;
  label: string;
};

export type NestedFilters<T extends Record<string, any>> = BaseFilter<T> & {
  type: 'boolean';
  options: NestedFiltersOption<T>[];
};

export type FilterItem<T extends Record<string, any>> =
  | CheckboxFilter<T>
  | DateFilter<T>
  | NestedFilters<T>;
