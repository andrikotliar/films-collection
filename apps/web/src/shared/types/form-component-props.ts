export type FormComponentProps<
  T extends Record<PropertyKey, unknown>,
  TProps = Record<PropertyKey, unknown>,
> = TProps & {
  values: T;
};
