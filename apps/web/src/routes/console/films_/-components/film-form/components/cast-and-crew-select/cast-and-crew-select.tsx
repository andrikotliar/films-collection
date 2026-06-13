import { useFieldArray, useFormContext } from 'react-hook-form';
import { Form } from '~/shared';
import type { ListOption } from '@films-collection/shared';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { PeopleSelect } from '~/routes/console/films_/-components/film-form/components/cast-and-crew-select/components';

type CastAndCrewSelectProps = {
  positionOptions: ListOption<string>[];
};

export const CastAndCrewSelect = ({ positionOptions }: CastAndCrewSelectProps) => {
  const { control } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'castAndCrew',
  });

  const handleAddNewPerson = () => {
    append(
      {
        role: 'ACTOR',
        people: [],
      },
      { shouldFocus: false },
    );
  };

  return (
    <Form.Section label="Cast and Crew">
      <Form.ArrayWrapper onCreate={handleAddNewPerson} createButtonLabel="Create person">
        {fields.map((field, index) => (
          <Form.ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <Form.Select
              name={`castAndCrew.${index}.role`}
              options={positionOptions}
              isSearchable={false}
              label="Role"
            />
            <PeopleSelect index={index} />
          </Form.ArrayFieldWrapper>
        ))}
      </Form.ArrayWrapper>
    </Form.Section>
  );
};
