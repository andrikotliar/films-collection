import { type api, type Input, getEmptyFormValues } from '~/shared';

export const defaultPersonValues = getEmptyFormValues<Input<typeof api.people.create>>({
  name: '',
});
