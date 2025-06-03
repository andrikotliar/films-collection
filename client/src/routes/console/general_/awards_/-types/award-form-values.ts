export type NominationFormValue = {
  id: number;
  title: string;
  shouldIncludeActor: boolean;
};

export type AwardFormValues = {
  title: string;
  image: any;
  description: string | null;
  nominations: NominationFormValue[];
};
