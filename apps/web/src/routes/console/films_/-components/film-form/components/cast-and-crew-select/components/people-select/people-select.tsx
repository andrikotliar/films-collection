import type { ListOption } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { api, Button, FieldError, Form, queryKey } from '~/shared';
import styles from './people-select.module.css';

type PeopleSelectProps = {
  index: number;
};

export const PeopleSelect = ({ index }: PeopleSelectProps) => {
  const { control, watch, formState } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const values = watch('castAndCrew');

  const { append, remove, fields } = useFieldArray({
    control,
    name: `castAndCrew.${index}.people`,
  });

  const { mutateAsync, isPending, variables } = useMutation({
    mutationFn: async ({
      value,
    }: {
      value: string;
      index: number;
    }): Promise<ListOption<number>> => {
      if (!value.length) {
        throw new Error('Name cannot be empty');
      }
      const result = await api.people.create({
        input: {
          name: value,
        },
      });

      return {
        value: result.id,
        label: result.name,
      };
    },
  });

  return (
    <div className={styles.people}>
      {fields.map((field, personIndex) => (
        <div key={field.id}>
          <div className={styles.row}>
            <div className={styles.left_column}>
              <Form.AsyncSelect
                name={`castAndCrew.${index}.people.${personIndex}.personId`}
                label="Person"
                optionsLoader={api.people.search}
                onCreateOption={(value) => mutateAsync({ value, index: personIndex })}
                isOptionsLoading={isPending && variables.index === personIndex}
                queryKey={[queryKey('people.search'), values[index]?.people[personIndex]?.personId]}
              />
              {values[index].role === 'ACTOR' && (
                <Form.TextInput
                  name={`castAndCrew.${index}.people.${personIndex}.details`}
                  label="Details"
                />
              )}
            </div>
            <Button icon={<TrashIcon />} variant="ghost" onClick={() => remove(personIndex)} />
          </div>
          <FieldError
            error={formState.errors.castAndCrew?.[index]?.people?.[personIndex]?.personId?.message}
          />
        </div>
      ))}
      <div>
        <Button
          variant="ghost"
          icon={<PlusIcon />}
          onClick={() =>
            append({
              personId: 0,
              details: null,
            })
          }
        >
          Add person
        </Button>
      </div>
    </div>
  );
};
