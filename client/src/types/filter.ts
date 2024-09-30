type FilterOption = {
  filter: string;
  title: string;
  property?: string;
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

export type { FilterItem, DateFilter, FilterOption };
