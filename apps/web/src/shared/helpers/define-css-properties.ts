export const defineCssProperties = (properties: Record<`--${string}`, string | undefined>) => {
  return properties as React.CSSProperties;
};
