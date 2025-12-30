import { Form, type FilterItem } from '~/shared';

type FilterOptionsProps = {
  filter: FilterItem;
};

export const FilterOptions = ({ filter }: FilterOptionsProps) => {
  switch (filter.type) {
    case 'checkmark':
      return (
        <Form.Group title={filter.title}>
          {filter.options.map((option) => (
            <Form.Checkbox
              type={filter.inputType}
              label={option.label}
              value={option.value.toString()}
              name={filter.id}
              key={option.value}
            />
          ))}
        </Form.Group>
      );

    case 'daterange':
      return <Form.DateRange title={filter.title} inputs={filter.inputs} />;

    case 'nested':
      return (
        <Form.Group title={filter.title}>
          {filter.options.map((option) => (
            <Form.Checkbox
              type="checkbox"
              label={option.label}
              name={option.id}
              key={option.id}
              rightIcon={option.icon}
            />
          ))}
        </Form.Group>
      );

    default:
      return null;
  }
};
