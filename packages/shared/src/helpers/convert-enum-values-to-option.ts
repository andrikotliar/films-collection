import { convertEnumValueToLabel } from './convert-enum-value-to-label';

export const convertEnumValuesToOption = <T extends string>(data: T[]) => {
  return Object.values(data).map((value) => ({
    value,
    label: convertEnumValueToLabel(value),
  }));
};
