import { type FormValues } from '@/routes/console/manage_/-types';
import { type ListOption } from '@/common';
import { FormAsyncSelect, FormSection, FormSelect, FormTextInput } from '@/components';
import { useState } from 'react';
import { FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
import {
  ArrayFormWrapper,
  ArrayFieldWrapper,
  FormModal,
  PersonForm,
} from '@/routes/console/-common';
import {
  useManagePerson,
  usePersonForm,
} from '@/routes/console/-common/components/person-form/hooks';
import { PeopleApi } from '@/api';

type CastAndCrewSelectProps = {
  positionOptions: ListOption[];
};

export const CastAndCrewSelect = ({ positionOptions }: CastAndCrewSelectProps) => {
  const { control } = useFormContext<FormValues>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const form = usePersonForm();

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

  const { mutate: createPerson } = useManagePerson({
    onSuccessHandler: () => {
      setIsCreateModalOpen(false);
      form.reset();
    },
  });

  return (
    <FormSection label="Cast and Crew">
      <ArrayFormWrapper onCreate={handleAddNewPerson} createButtonLabel="Create person">
        {fields.map((field, index) => (
          <ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <FormAsyncSelect
              name={`crew.${index}.personId`}
              label="Person"
              optionsLoader={PeopleApi.searchByName}
              onCreateOption={() => setIsCreateModalOpen(true)}
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
      <FormModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <FormProvider {...form}>
          <PersonForm
            onSubmit={form.handleSubmit((values) => createPerson(values))}
            title="Add crew member"
          />
        </FormProvider>
      </FormModal>
    </FormSection>
  );
};
