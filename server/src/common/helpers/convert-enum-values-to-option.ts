import { convertEnumValueToLabel } from './convert-enum-value-to-label';

export const convertEnumValuesToOption = (
  enumObject: Record<string, string>,
) => {
  return Object.values(enumObject).map((value) => ({
    value,
    label: convertEnumValueToLabel(value),
  }));
};
