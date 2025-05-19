import styles from './cast-select.module.css';
import { searchPersonQuery } from '@/queries';
import { CreatePersonModal } from '@/routes/console/-components';
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
import { useFieldArray, useFormContext } from 'react-hook-form';

export const CastSelect = () => {
  const { control } = useFormContext<FormValues>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cast',
  });

  return (
    <FormSection label="Cast">
      <Search placeholder="Search person..." query={searchPersonQuery}>
        {({ data, onFinishInteraction }) => (
          <SearchResultPeopleList
            data={data ?? []}
            onAdd={(person) => {
              append({
                personId: person.id,
                name: person.name,
                characterName: '',
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
            <div>
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
      <CreatePersonModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(data) => {
          append({
            personId: data.id,
            name: data.name,
            characterName: '',
          });
        }}
        title="Add actor"
      />
    </FormSection>
  );
};
