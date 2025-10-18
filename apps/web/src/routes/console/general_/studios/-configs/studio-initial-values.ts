import { NEW_ITEM_ID } from '~/common';
import type { StudioMutationPayload } from '~/hooks/queries/use-mutate-studio';

export const studioInitialValues: StudioMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
};
