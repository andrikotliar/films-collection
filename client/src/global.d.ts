declare module '*.svg?react' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;

  export default ReactComponent;
}
