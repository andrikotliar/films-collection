import type { CSSProperties } from 'react';

export const defineCssProperties = (properties: Record<`--${string}`, string>) => {
  return properties as CSSProperties;
};
