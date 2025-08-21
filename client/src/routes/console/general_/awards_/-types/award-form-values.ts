export type NominationFormValue = {
  id: number;
  title: string;
  shouldIncludeActor: boolean;
};

export type AwardFormValues = {
  title: string;
  description: string | null;
  nominations: NominationFormValue[];
};
