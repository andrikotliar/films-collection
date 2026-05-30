import { useFieldArray, useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { Form, type api, type ApiResponse } from '~/shared';

type CollectionsSelectProps = {
  options: ApiResponse<typeof api.initialData.get>['options']['collections'];
};

const defaultCollection: z.infer<typeof FilmFormSchema>['collections'][number] = {
  collectionId: 0,
  order: 0,
};

export const CollectionsSelect = ({ options }: CollectionsSelectProps) => {
  const { control, formState } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collections',
  });

  return (
    <Form.Section label="Collections">
      <Form.ArrayWrapper onCreate={() => append(defaultCollection)}>
        {fields.map((field, index) => (
          <Form.ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <Form.Select
              name={`awards.${index}.awardId`}
              options={options}
              label="Award"
              error={formState.errors?.collections?.[index]?.collectionId?.message}
            />
          </Form.ArrayFieldWrapper>
        ))}
      </Form.ArrayWrapper>
    </Form.Section>
  );
};
