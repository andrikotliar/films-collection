import { useFieldArray, useFormContext } from 'react-hook-form';
import { type FilmFormValues } from '~/routes/console/films_/-types';
import { Form, api } from '~/shared';
import { defaultPersonValues, useFormModal } from '~/routes/console/-shared';
import type { ListOption } from '@films-collection/shared';

type CastAndCrewSelectProps = {
  positionOptions: ListOption<string>[];
};

export const CastAndCrewSelect = ({ positionOptions }: CastAndCrewSelectProps) => {
  const { control } = useFormContext<FilmFormValues>();
  const { onOpen } = useFormModal();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'castAndCrew',
  });

  const handleAddNewPerson = () => {
    append({
      personId: null,
      comment: null,
      role: '',
      details: null,
    });
  };

  return (
    <Form.Section label="Cast and Crew">
      <Form.ArrayWrapper onCreate={handleAddNewPerson} createButtonLabel="Create person">
        {fields.map((field, index) => (
          <Form.ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <Form.AsyncSelect
              name={`crew.${index}.personId`}
              label="Person"
              optionsLoader={api.people.search.list}
              onCreateOption={() => onOpen(defaultPersonValues)}
            />
            <Form.Select
              name={`crew.${index}.role`}
              options={positionOptions}
              isSearchable={false}
              label="Role"
            />
            <Form.TextInput name={`crew.${index}.details`} label="Details" />
            <Form.TextInput name={`crew.${index}.comment`} label="Comment" />
          </Form.ArrayFieldWrapper>
        ))}
      </Form.ArrayWrapper>
    </Form.Section>
  );
};
