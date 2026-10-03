import type { api, ApiResponse } from '~/shared';

export const validateLanguage = (
  description: string | null,
  user?: ApiResponse<typeof api.users.getUser>,
) => {
  if (!description?.length) {
    return;
  }

  if (!user) {
    throw new Error('User is not defined');
  }

  if (!user.translationPreferences?.toValidation) {
    return;
  }

  const regex = new RegExp(user.translationPreferences.toValidation);
  const correctLang = regex.test(description);

  if (correctLang) {
    return;
  }

  throw new Error(
    `Synopsis is written in wrong language. Translate to ${user.translationPreferences.to}`,
  );
};
