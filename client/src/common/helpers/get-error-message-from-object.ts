import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export const getErrorMessageFromObject = (
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>,
): string | null => {
  if (!errors) {
    return null;
  }

  if (typeof errors === 'string') {
    return errors;
  }

  return Object.values(errors)
    .map((error) => error.message)
    .join('; ');
};
