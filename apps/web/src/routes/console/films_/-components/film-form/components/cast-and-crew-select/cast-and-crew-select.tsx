import { useFieldArray, useFormContext } from 'react-hook-form';
import { Form, api } from '~/shared';
import { defaultPersonValues, useFormModal } from '~/routes/console/-shared';
import type { ListOption } from '@films-collection/shared';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';

type CastAndCrewSelectProps = {
  positionOptions: ListOption<string>[];
};

export const CastAndCrewSelect = ({ positionOptions }: CastAndCrewSelectProps) => {
  const { control } = useFormContext<z.infer<typeof FilmFormSchema>>();
  const { onOpen } = useFormModal();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'castAndCrew',
  });

  const handleAddNewPerson = () => {
    append({
      personId: 0,
      comment: null,
      role: 'ACTOR',
      details: null,
    });
  };

  return (
    <Form.Section label="Cast and Crew">
      <Form.ArrayWrapper onCreate={handleAddNewPerson} createButtonLabel="Create person">
        {fields.map((field, index) => (
          <Form.ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <Form.AsyncSelect
              name={`castAndCrew.${index}.personId`}
              label="Person"
              optionsLoader={api.people.search.list}
              onCreateOption={() => onOpen(defaultPersonValues)}
            />
            <Form.Select
              name={`castAndCrew.${index}.role`}
              options={positionOptions}
              isSearchable={false}
              label="Role"
            />
            <Form.TextInput name={`castAndCrew.${index}.details`} label="Details" />
            <Form.TextInput name={`castAndCrew.${index}.comment`} label="Comment" />
          </Form.ArrayFieldWrapper>
        ))}
      </Form.ArrayWrapper>
    </Form.Section>
  );
};
