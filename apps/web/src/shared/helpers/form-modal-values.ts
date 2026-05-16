import type { ComponentProps } from 'react';

export type FormModalValues<T extends (props: { values: any }) => React.ReactElement> =
  ComponentProps<T>['values'];
