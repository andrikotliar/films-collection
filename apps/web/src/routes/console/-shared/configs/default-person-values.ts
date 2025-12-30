import { NEW_ITEM_ID } from '@films-collection/shared';
import type { api, Input, FormValues } from '~/shared';

export const defaultPersonValues: FormValues<Input<typeof api.people.create>> = {
  id: NEW_ITEM_ID,
  name: '',
};
