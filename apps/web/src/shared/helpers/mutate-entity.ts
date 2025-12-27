import { isNewItem } from '~/shared/helpers/is-new-item';
import type { ExtractInputParams, FormValues } from '~/shared/types';

export const mutateEntity = <
  TCreateFunction extends (args: { input: any }) => Promise<unknown>,
  TUpdateFunction extends (args: { input: any; params: { id: number } }) => Promise<unknown>,
>(
  createFn: TCreateFunction,
  updateFn: TUpdateFunction,
) => {
  return ({ id, ...input }: FormValues<ExtractInputParams<TCreateFunction>>) => {
    if (isNewItem(id)) {
      return createFn({
        input,
      });
    }

    return updateFn({
      params: {
        id,
      },
      input,
    });
  };
};
