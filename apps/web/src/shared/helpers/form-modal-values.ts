import type { ComponentProps } from 'react';

export type FormModalValues<T extends (props: { values: any }) => JSX.Element> =
  ComponentProps<T>['values'];
