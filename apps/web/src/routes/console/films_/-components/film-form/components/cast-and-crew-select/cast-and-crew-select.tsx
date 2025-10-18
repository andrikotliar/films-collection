import { useFieldArray, useFormContext } from 'react-hook-form';
import { type FilmFormValues } from '~/routes/console/films_/-types';
import {
  type ListOption,
  FormAsyncSelect,
  FormSection,
  FormSelect,
  FormTextInput,
  type PersonMutationPayload,
} from '~/common';
import { ArrayFormWrapper, ArrayFieldWrapper, defaultPersonValues } from '~/routes/console/-common';
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
    <FormSection label="Cast and Crew">
      <ArrayFormWrapper onCreate={handleAddNewPerson} createButtonLabel="Create person">
        {fields.map((field, index) => (
          <ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <FormAsyncSelect
              name={`crew.${index}.personId`}
              label="Person"
              optionsLoader={PeopleApi.searchByName}
              onCreateOption={() => onPersonChange(defaultPersonValues)}
            />
            <FormSelect
              name={`crew.${index}.role`}
              options={positionOptions}
              isSearchable={false}
              label="Role"
            />
            <FormTextInput name={`crew.${index}.details`} label="Details" />
            <FormTextInput name={`crew.${index}.comment`} label="Comment" />
          </ArrayFieldWrapper>
        ))}
      </ArrayFormWrapper>
    </FormSection>
  );
};
