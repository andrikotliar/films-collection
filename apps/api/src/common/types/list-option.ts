export type ListOption<T = number> = {
  label: string;
  value: T;
  [key: string]: unknown;
};
