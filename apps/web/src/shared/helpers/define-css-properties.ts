export const defineCssProperties = (properties: Record<`--${string}`, string>) => {
  return properties as React.CSSProperties;
};
