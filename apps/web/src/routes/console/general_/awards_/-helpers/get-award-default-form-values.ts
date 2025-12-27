import type { UpdateAwardInput } from '@films-collection/shared';
import { awardDefaultFormValues } from '~/routes/console/general_/awards_/-configs';

export const getFormDefaultValues = (data: UpdateAwardInput | null) => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      nominations: data.nominations,
    };
  }

  return awardDefaultFormValues;
};
