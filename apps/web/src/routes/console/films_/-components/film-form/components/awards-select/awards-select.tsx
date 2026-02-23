import { useFieldArray, useFormContext } from 'react-hook-form';
import { Form } from '~/shared';
import { NominationSelect } from './components';
import type { ListOption } from '@films-collection/shared';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';

type AwardsSelectProps = {
  awardOptions: ListOption<number>[];
};

const defaultAward: z.infer<typeof FilmFormSchema>['awards'][number] = {
  actorId: null,
  awardId: 0,
  nominationId: 0,
  comment: null,
};

export const AwardsSelect = ({ awardOptions }: AwardsSelectProps) => {
  const { control } = useFormContext<z.infer<typeof FilmFormSchema>>();

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
