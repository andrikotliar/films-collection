export type ListOption<T = number, A extends Record<string, unknown> = Record<string, unknown>> = {
  label: string;
  value: T;
} & A;
