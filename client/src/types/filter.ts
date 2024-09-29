type FilterKeys = 'general' | 'collections';

type FilterOption = {
  filter: string;
  title: string;
};

type CheckboxFilter = {
  type: 'checkmark';
  options: FilterOption[];
  inputType: 'checkbox' | 'radio';
  property: string;
};

type DateFilterInput = {
  label: string;
  property: string;
};

type DateFilter = {
  type: 'daterange';
  inputs: {
    start: DateFilterInput;
    end: DateFilterInput;
  };
};

type FilterTypes = CheckboxFilter | DateFilter;

type FilterItem = {
  title: string;
} & FilterTypes;

type Filters = {
  [key in FilterKeys]: FilterItem[];
};

export type { FilterItem, Filters, DateFilter, FilterOption };
