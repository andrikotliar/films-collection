import styles from './cast-select.module.css';
import { searchPersonQuery } from '@/queries';
import { FormValues } from '@/routes/console/manage_/-types';
import {
  Button,
  FormSection,
  FormTextInput,
  Search,
  SearchResultPeopleList,
} from '@/components';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
import {
  useManagePerson,
  usePersonForm,
} from '@/routes/console/-components/person-form/hooks';
import { FormModal, PersonForm } from '@/routes/console/-components';
import { Person } from '@/types';

export const CastSelect = () => {
  const { control } = useFormContext<FormValues>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cast',
  });

  const form = usePersonForm();

  const handleAddNewPerson = (data: Person) => {
    append({
      personId: data.id,
      name: data.name,
      characterName: '',
    });
  };

  const { mutate: createPerson } = useManagePerson({
    onSuccessHandler: (data) => {
      handleAddNewPerson(data);
      setIsCreateModalOpen(false);
    },
  });

  return (
    <FormSection label="Cast">
      <Search placeholder="Search person..." query={searchPersonQuery}>
        {({ data, onFinishInteraction }) => (
          <SearchResultPeopleList
            data={data ?? []}
            onAdd={(person) => {
              handleAddNewPerson(person);
              onFinishInteraction();
            }}
            onCreate={() => {
              setIsCreateModalOpen(true);
              onFinishInteraction();
            }}
          />
        )}
      </Search>
      <div className={styles.selected}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.selectedRow}>
            <div className={styles.name}>{field.name}</div>
            <div className={styles.inputs}>
              <FormTextInput
                name={`cast.${index}.characterName`}
                placeholder="Character name"
              />
            </div>
            <Button
              icon={<Trash2Icon />}
              variant="ghost"
              onClick={() => remove(index)}
              className={styles.removeButton}
            />
          </div>
        ))}
      </div>
      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <FormProvider {...form}>
          <PersonForm
            title="Create person"
            onSubmit={form.handleSubmit((values) => createPerson(values))}
          />
        </FormProvider>
      </FormModal>
    </FormSection>
  );
};
