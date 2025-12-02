import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FormAward, FilmFormValues } from '~/routes/console/films_/-types';
import { type ListOption, Form } from '~/shared';
import { NominationSelect } from './components';

type Props = {
  awardOptions: ListOption<number>[];
};

const defaultAward: FormAward = {
  personId: null,
  awardId: null,
  nominationId: null,
  comment: null,
};

export const AwardsSelect = ({ awardOptions }: Props) => {
  const { control } = useFormContext<FilmFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'awards',
  });

  return (
    <Form.Section label="Awards">
      <Form.ArrayWrapper onCreate={() => append(defaultAward)}>
        {fields.map((field, index) => (
          <Form.ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <Form.Select name={`awards.${index}.awardId`} options={awardOptions} label="Award" />
            <NominationSelect index={index} />
            <Form.TextInput name={`awards.${index}.comment`} label="Comment" />
          </Form.ArrayFieldWrapper>
        ))}
      </Form.ArrayWrapper>
    </Form.Section>
  );
};
