import { ConfigOption } from '@/types';

export const getDefaultSortingFieldLabel = (
  fields: ConfigOption[],
  selectedSortingField?: string,
) => {
  if (!selectedSortingField) {
    return fields[0].label;
  }

  const option = fields.find((option) => option.value === selectedSortingField);

  return option?.label ?? fields[0].label;
};
