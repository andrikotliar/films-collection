import { ListOption } from '~/lib';

export const getDefaultLabel = (fields: ListOption[], selectedSortingField?: string) => {
  if (!selectedSortingField) {
    return fields[0].label;
  }

  const option = fields.find((option) => option.value === selectedSortingField);

  return option?.label ?? fields[0].label;
};
