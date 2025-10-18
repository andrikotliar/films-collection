import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FormAward, FilmFormValues } from '~/routes/console/films_/-types';
import { type ListOption, FormSection, FormSelect, FormTextInput } from '~/common';
import { ArrayFormWrapper, ArrayFieldWrapper } from '~/routes/console/-common';
import { NominationSelect } from './components';

type AwardsSelectProps = {
  awardOptions: ListOption<number>[];
};

const defaultAward: FormAward = {
  personId: null,
  awardId: null,
  nominationId: null,
  comment: null,
};

export const AwardsSelect = ({ awardOptions }: AwardsSelectProps) => {
  const { control } = useFormContext<FilmFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'awards',
  });

  return (
    <FormSection label="Awards">
      <ArrayFormWrapper onCreate={() => append(defaultAward)}>
        {fields.map((field, index) => (
          <ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <FormSelect name={`awards.${index}.awardId`} options={awardOptions} label="Award" />
            <NominationSelect index={index} />
            <FormTextInput name={`awards.${index}.comment`} label="Comment" />
          </ArrayFieldWrapper>
        ))}
      </ArrayFormWrapper>
    </FormSection>
  );
};
