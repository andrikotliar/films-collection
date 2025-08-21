import { type FormValues } from '@/routes/console/manage_/-types';
import { type ListOption } from '@/common';
import { FormAsyncSelect, FormSection, FormSelect, FormTextInput } from '@/components';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  ArrayFormWrapper,
  ArrayFieldWrapper,
  FormModal,
  PersonForm,
  defaultPersonValues,
} from '@/routes/console/-common';
import { PeopleApi } from '@/api';
import type { PersonMutationPayload } from '@/hooks';

type CastAndCrewSelectProps = {
  positionOptions: ListOption[];
};

export const CastAndCrewSelect = ({ positionOptions }: CastAndCrewSelectProps) => {
  const { control } = useFormContext<FormValues>();
  const [person, setPerson] = useState<PersonMutationPayload | null>(null);

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
              onCreateOption={() => setPerson(defaultPersonValues)}
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
      <FormModal
        values={person}
        onClose={() => setPerson(null)}
        afterSubmitEffect={() => setPerson(null)}
        form={PersonForm}
      />
    </FormSection>
  );
};
