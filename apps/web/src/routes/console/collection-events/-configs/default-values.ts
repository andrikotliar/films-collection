import { getDefaultDateCode, NEW_ITEM_ID, type CollectionEventMutationPayload } from '~/lib';

export const getDefaultValues = (): CollectionEventMutationPayload => {
  const defaultDateCode = getDefaultDateCode();

  return {
    id: NEW_ITEM_ID,
    title: '',
    collectionId: 0,
    startDateCode: defaultDateCode,
    endDateCode: defaultDateCode + 1,
    yearFrom: 0,
    isOneDayEvent: false,
    titleFilmId: null,
  };
};
