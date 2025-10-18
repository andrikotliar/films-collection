import { FormCheckbox, FormGroup, FormDateRange, type FilterItem } from '~/common';

type FilterOptionsProps = {
  filter: FilterItem;
};

export const FilterOptions = ({ filter }: FilterOptionsProps) => {
  switch (filter.type) {
    case 'checkmark':
      return (
        <FormGroup title={filter.title}>
          {filter.options.map((option) => (
            <FormCheckbox
              type={filter.inputType}
              label={option.label}
              value={option.value}
              name={filter.id}
              key={option.value}
            />
          ))}
        </FormGroup>
      );

    case 'daterange':
      return <FormDateRange title={filter.title} inputs={filter.inputs} />;

    case 'nested':
      return (
        <FormGroup title={filter.title}>
          {filter.options.map((option) => (
            <FormCheckbox
              type="checkbox"
              label={option.label}
              name={option.id}
              key={option.id}
              rightIcon={option.icon}
            />
          ))}
        </FormGroup>
      );

    default:
      return null;
  }
};
