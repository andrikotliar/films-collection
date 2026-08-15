import type { api, ApiResponse } from '~/shared';

export const validateLanguage = (
  synopsis: string | null,
  user?: ApiResponse<typeof api.users.getUser>,
) => {
  if (!synopsis?.length) {
    return;
  }

  if (!user) {
    throw new Error('User is not defined');
  }

  if (!user.translationPreferences?.toValidation) {
    return;
  }

  const regex = new RegExp(user.translationPreferences.toValidation);
  const correctLang = regex.test(synopsis);

  if (correctLang) {
    return;
  }

  throw new Error(
    `Synopsis is written in wrong language. Translate to ${user.translationPreferences.to}`,
  );
};
