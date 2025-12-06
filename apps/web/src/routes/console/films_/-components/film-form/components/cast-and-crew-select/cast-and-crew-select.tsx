import { useFieldArray, useFormContext } from 'react-hook-form';
import { type FilmFormValues } from '~/routes/console/films_/-types';
import { type ListOption, Form, type PersonMutationPayload } from '~/shared';
import { defaultPersonValues } from '~/routes/console/-shared';
import { PeopleApi } from '~/api';

type CastAndCrewSelectProps = {
  positionOptions: ListOption[];
  onPersonChange: (person: PersonMutationPayload) => void;
};

export const CastAndCrewSelect = ({ positionOptions, onPersonChange }: CastAndCrewSelectProps) => {
  const { control } = useFormContext<FilmFormValues>();

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
              optionsLoader={PeopleApi.searchByName}
              onCreateOption={() => onPersonChange(defaultPersonValues)}
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
