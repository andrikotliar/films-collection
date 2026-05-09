import { Form, type FilterItem } from '~/shared';

type FilterOptionsProps<T extends Record<string, any>> = {
  filter: FilterItem<T>;
};

export const FilterOptions = <T extends Record<string, any>>({ filter }: FilterOptionsProps<T>) => {
  switch (filter.type) {
    case 'checkmark':
      return (
        <Form.Group title={filter.title}>
          {filter.options.map((option) => (
            <Form.Checkbox
              type={filter.inputType}
              label={option.label}
              value={option.value}
              name={filter.id}
              key={option.value}
            />
          ))}
        </Form.Group>
      );

    case 'daterange':
      return <Form.DateRange title={filter.title} inputs={filter.inputs} />;

    case 'boolean':
      return (
        <Form.Group title={filter.title}>
          {filter.options.map((option) => (
            <Form.Checkbox type="checkbox" label={option.label} name={option.id} key={option.id} />
          ))}
        </Form.Group>
      );

    default:
      return null;
  }
};
