export type ListOption<V = string, L = string> = {
  label: L;
  value: V;
  [key: string]: unknown;
};
