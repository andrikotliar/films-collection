import { searchPersonQuery } from '@/queries';
import { FormValues } from '@/routes/console/manage_/-types';
import { ListOption } from '@/types';
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
import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './crew-select.module.css';
import { CreatePersonModal } from '@/routes/console/-components';

type CrewSelectProps = {
  positionOptions: ListOption[];
};

export const CrewSelect: FC<CrewSelectProps> = ({ positionOptions }) => {
  const { control } = useFormContext<FormValues>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'crew',
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
      <CreatePersonModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(data) => {
          append({
            personId: data.id,
            name: data.name,
            position: '',
            comment: null,
          });
        }}
        title="Add crew member"
      />
    </FormSection>
  );
};
