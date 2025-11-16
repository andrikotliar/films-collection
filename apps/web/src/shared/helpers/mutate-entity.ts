import { isNewItem } from '~/shared/helpers/is-new-item';
import type { UnknownEntity, FormValues, ApiContainer } from '~/shared/types';

export const mutateEntity = async <
  TApiContainer extends ApiContainer,
  TPayload extends FormValues<UnknownEntity>,
>(
  apiContainer: TApiContainer,
  { id, ...args }: TPayload,
) => {
  if (isNewItem(id)) {
    return apiContainer.create(args);
  }

  return apiContainer.update(id, args);
};
