import { getEmptyFormValues } from '~/shared';

export const defaultPendingFilm = getEmptyFormValues({
  title: '',
  priority: 1,
  collectionId: null,
  rating: null,
});
