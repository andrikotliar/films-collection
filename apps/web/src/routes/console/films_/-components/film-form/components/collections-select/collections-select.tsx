import { CollectionCategory, type ListOption } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { FilmOrderSelect } from '~/routes/console/films_/-components/film-form/components/collections-select/components';
import { api, FieldError, Form, toaster, type ApiResponse } from '~/shared';

type CollectionsSelectProps = {
  options: ApiResponse<typeof api.initialData.get>['options']['collections'];
};

const defaultCollection: z.infer<typeof FilmFormSchema>['collections'][number] = {
  collectionId: 0,
  order: 0,
};

const chapterPrefixes = ['G', 'C', 'U', 'T'] as const;

const checkIsValidCollectionName = (value: string) => {
  const prefix = value.charAt(0) as (typeof chapterPrefixes)[number];
  const divider = value.charAt(1);

  if (divider !== ':') {
    return false;
  }

  return chapterPrefixes.includes(prefix);
};

const parsePrefix = (prefix: (typeof chapterPrefixes)[number]) => {
  switch (prefix) {
    case 'C':
      return CollectionCategory.CHAPTER;
    case 'T':
      return CollectionCategory.TOP;
    case 'U':
      return CollectionCategory.CINEMATIC_UNIVERSE;
    default:
      return CollectionCategory.GENERAL;
  }
};

export const CollectionsSelect = ({ options }: CollectionsSelectProps) => {
  const { control, formState, watch } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collections',
  });

  const collections = watch('collections');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (value: string): Promise<ListOption<number>> => {
      const isValidName = checkIsValidCollectionName(value);

      if (!isValidName) {
        toaster.error(
          'Collection name should follow the name convention: [Prefix]:[Name], where Prefix: G - general collection; U - cinematic universe; C - chapters; 4) T - top',
        );
        throw new Error('Invalid collection name');
      }

      if (!value.length) {
        throw new Error('Chapter Key cannot be empty');
      }

      const [prefix, title] = value.split(':');

      const category = parsePrefix(prefix as (typeof chapterPrefixes)[number]);

      const result = await api.collections.create({
        input: {
          title,
          category,
        },
      });

      return {
        value: result.id,
        label: result.title,
      };
    },
    meta: {
      skipErrorToast: true,
    },
  });

  return (
    <Form.Section label="Collections">
      <Form.ArrayWrapper onCreate={() => append(defaultCollection)}>
        {fields.map((field, index) => (
          <Form.ArrayFieldWrapper onRemove={() => remove(index)} key={field.id}>
            <Form.Select
              name={`collections.${index}.collectionId`}
              options={options}
              label="Collection"
              error={formState.errors?.collections?.[index]?.collectionId?.message}
              isOptionsLoading={isPending}
              onCreateOption={mutateAsync}
            />
            {collections[index].collectionId !== 0 && (
              <FilmOrderSelect
                name={`collections.${index}.order`}
                currentCollection={collections[index]}
              />
            )}
            <FieldError error={formState.errors?.collections?.[index]?.order?.message} />
          </Form.ArrayFieldWrapper>
        ))}
      </Form.ArrayWrapper>
    </Form.Section>
  );
};
