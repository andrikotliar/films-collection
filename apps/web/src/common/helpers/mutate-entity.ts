import { isNewItem } from '~/common/helpers/is-new-item';
import type { UnknownEntity, FormValues, ApiContainer } from '~/common/types';

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
