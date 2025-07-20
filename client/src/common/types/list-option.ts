export type ListOption<V = string> = {
  label: string;
  value: V;
  [key: string]: unknown;
};
