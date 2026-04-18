import { convertEnumValueToLabel } from './convert-enum-value-to-label';

export const convertEnumValuesToOption = <T extends string>(values: T[]) => {
  return values.map((value) => ({
    value,
    label: convertEnumValueToLabel(value),
  }));
};
