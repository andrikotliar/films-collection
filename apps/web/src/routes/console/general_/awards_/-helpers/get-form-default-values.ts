import { type AwardWithNominations } from '@/api';
import { awardDefaultFormValues } from '@/routes/console/general_/awards_/-configs';

export const getFormDefaultValues = (data: AwardWithNominations | null) => {
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
