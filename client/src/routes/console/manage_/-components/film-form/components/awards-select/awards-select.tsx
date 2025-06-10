import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormAward, FormValues } from '@/routes/console/manage_/-types';
import { ListOption } from '@/types';
import { FormSection, FormSelect, FormTextInput } from '@/components';
import {
  ArrayFormWrapper,
  ArrayFieldWrapper,
} from '@/routes/console/-components';
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
  const { control } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'awards',
  });

  return (
    <FormSection label="Awards">
      <ArrayFormWrapper onCreate={() => append(defaultAward)}>
        {fields.map((field, index) => (
          <ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <FormSelect
              name={`awards.${index}.awardId`}
              options={awardOptions}
              label="Award"
            />
            <NominationSelect index={index} />
            <FormTextInput name={`awards.${index}.comment`} label="Comment" />
          </ArrayFieldWrapper>
        ))}
      </ArrayFormWrapper>
    </FormSection>
  );
};
