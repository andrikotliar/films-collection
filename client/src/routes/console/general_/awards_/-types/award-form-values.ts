import type { FormValues } from '@/common';

export type NominationFormValue = {
  id: number;
  title: string;
  shouldIncludeActor: boolean;
};

export type AwardFormValues = FormValues<{
  title: string;
  description: string | null;
  nominations: NominationFormValue[];
}>;
