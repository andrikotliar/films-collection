export const validateVariants = (value, variants) => {
  if (!variants?.length) {
    return true;
  }

  if (!variants.includes(value)) {
    return false;
  }

  return true;
};
