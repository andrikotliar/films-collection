import { ListOption } from './list-option';

export type CheckboxFilter = {
  type: 'checkmark';
  options: ListOption<string | number>[];
  inputType: 'checkbox' | 'radio';
  property: string;
};

export type DateFilterInput = {
  label: string;
  property: string;
};

export type DateFilter = {
  type: 'daterange';
  inputs: {
    start: DateFilterInput;
    end: DateFilterInput;
  };
};

export type FilterTypes = CheckboxFilter | DateFilter;

export type FilterItem = {
  title: string;
} & FilterTypes;
