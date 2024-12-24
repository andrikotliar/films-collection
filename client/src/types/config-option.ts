export type ConfigOption<T = string, L = string> = {
  label: L;
  value: T;
  [key: string]: unknown;
};
