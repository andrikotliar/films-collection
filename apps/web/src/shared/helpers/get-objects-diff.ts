export const getObjectsDiff = <
  TPrev extends Record<string, any>,
  TNext extends Record<string, any>,
>(
  prev: TPrev | null | undefined,
  next: TNext | null | undefined,
): Partial<TNext> | null | undefined => {
  if (Object.is(prev, next)) {
    return undefined;
  }

  if (typeof prev !== 'object' || typeof next !== 'object' || prev === null || next === null) {
    return next;
  }

  if (Array.isArray(prev) || Array.isArray(next)) {
    if (!Array.isArray(prev) || !Array.isArray(next)) {
      return next;
    }

    if (prev.length !== next.length) {
      return next;
    }

    const used = new Array(next.length).fill(false);

    for (const prevItem of prev) {
      let found = false;

      for (let i = 0; i < next.length; i++) {
        if (!used[i] && getObjectsDiff(prevItem, next[i]) === undefined) {
          used[i] = true;
          found = true;
          break;
        }
      }

      if (!found) {
        return next;
      }
    }

    return undefined;
  }

  const result: Record<string, any> = {};
  const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);

  for (const key of keys) {
    const diff = getObjectsDiff(prev[key as keyof TPrev], next[key]);
    if (diff !== undefined) {
      result[key] = diff;
    }
  }

  return Object.keys(result).length ? (result as Partial<TNext>) : undefined;
};
