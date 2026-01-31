import { useFieldArray, useFormContext } from 'react-hook-form';
import { Form, api, getInitialDataQueryOptions } from '~/shared';
import type { ListOption } from '@films-collection/shared';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import { useMutation, useQuery } from '@tanstack/react-query';

type CastAndCrewSelectProps = {
  positionOptions: ListOption<string>[];
};

export const CastAndCrewSelect = ({ positionOptions }: CastAndCrewSelectProps) => {
  const { control } = useFormContext<z.infer<typeof FilmFormSchema>>();
  const { data } = useQuery(getInitialDataQueryOptions());

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'castAndCrew',
  });

  const handleAddNewPerson = () => {
    append(
      {
        personId: 0,
        comment: null,
        role: 'ACTOR',
        details: null,
      },
      { shouldFocus: false },
    );
  };

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
    <Form.Section label="Cast and Crew">
      <Form.ArrayWrapper onCreate={handleAddNewPerson} createButtonLabel="Create person">
        {fields.map((field, index) => (
          <Form.ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <Form.AsyncSelect
              name={`castAndCrew.${index}.personId`}
              label="Person"
              optionsLoader={api.people.search.list}
              onCreateOption={(value) => mutateAsync({ value, index })}
              isOptionsLoading={isPending && variables.index === index}
              defaultOptions={data?.options.selectedPeople}
            />
            <Form.Select
              name={`castAndCrew.${index}.role`}
              options={positionOptions}
              isSearchable={false}
              label="Role"
            />
            <Form.TextInput name={`castAndCrew.${index}.details`} label="Details" />
            <Form.TextInput name={`castAndCrew.${index}.comment`} label="Comment" />
          </Form.ArrayFieldWrapper>
        ))}
      </Form.ArrayWrapper>
    </Form.Section>
  );
};
