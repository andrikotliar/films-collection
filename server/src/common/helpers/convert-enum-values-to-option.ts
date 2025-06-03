import { convertEnumValueToLabel } from './convert-enum-value-to-label';

export const convertEnumValuesToOption = (data: Record<string, string>) => {
  return Object.values(data).map((value) => ({
    value,
    label: convertEnumValueToLabel(value),
  }));
};
