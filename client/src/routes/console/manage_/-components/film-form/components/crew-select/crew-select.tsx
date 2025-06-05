import { searchPersonQuery } from '@/queries';
import { FormValues } from '@/routes/console/manage_/-types';
import { ListOption, Person } from '@/types';
import {
  Button,
  FormSection,
  FormSelect,
  FormTextInput,
  Search,
  SearchResultPeopleList,
} from '@/components';
import { Trash2Icon } from 'lucide-react';
import { FC, useState } from 'react';
import { FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
import styles from './crew-select.module.css';
import { FormModal, PersonForm } from '@/routes/console/-components';
import {
  useManagePerson,
  usePersonForm,
} from '@/routes/console/-components/person-form/hooks';

type CrewSelectProps = {
  positionOptions: ListOption[];
};

export const CrewSelect: FC<CrewSelectProps> = ({ positionOptions }) => {
  const { control } = useFormContext<FormValues>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const form = usePersonForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'crew',
  });

  const handleAddNewPerson = (data: Person) => {
    append({
      personId: data.id,
      name: data.name,
      comment: null,
      position: '',
    });
  };

  const { mutate: createPerson } = useManagePerson({
    onSuccessHandler: (data) => {
      handleAddNewPerson(data);
      setIsCreateModalOpen(false);
    },
  });

  return (
    <FormSection label="Crew">
      <Search placeholder="Search person..." query={searchPersonQuery}>
        {({ data, onFinishInteraction }) => (
          <SearchResultPeopleList
            data={data ?? []}
            onAdd={(person) => {
              append({
                personId: person.id,
                name: person.name,
                position: '',
                comment: null,
              });
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
              <FormSelect
                name={`crew.${index}.position`}
                options={positionOptions}
                isSearchable={false}
              />
              <FormTextInput
                name={`crew.${index}.comment`}
                placeholder="Comment"
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
            onSubmit={form.handleSubmit((values) => createPerson(values))}
            title="Add crew member"
          />
        </FormProvider>
      </FormModal>
    </FormSection>
  );
};
