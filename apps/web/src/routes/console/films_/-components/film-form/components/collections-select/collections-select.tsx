import {
  CollectionCategory,
  convertEnumValuesToOption,
  enumValues,
  type Enum,
  type ListOption,
} from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { FilmOrderSelect } from '~/routes/console/films_/-components/film-form/components/collections-select/components';
import { api, FieldError, FieldLabel, Form, Modal, Select, type ApiResponse } from '~/shared';

type CollectionsSelectProps = {
  options: ApiResponse<typeof api.initialData.get>['options']['collections'];
};

const defaultCollection: z.infer<typeof FilmFormSchema>['collections'][number] = {
  collectionId: 0,
  order: 0,
};

const collectionCategoryOptions = convertEnumValuesToOption(enumValues(CollectionCategory));

export const CollectionsSelect = ({ options }: CollectionsSelectProps) => {
  const [newCategory, setNewCategory] = useState<ListOption<number> | null>(null);
  const { control, formState, watch } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collections',
  });

  const collections = watch('collections');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (title: string): Promise<ListOption<number>> => {
      if (!title.length) {
        throw new Error('Collection title cannot be empty');
      }

      const result = await api.collections.create({
        input: {
          title,
          category: CollectionCategory.GENERAL,
          films: [],
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
    onSuccess: (values) => {
      setNewCategory(values);
    },
  });

  const { mutate, isPending: collectionUpdating } = useMutation({
    mutationFn: async ({
      category,
      id,
    }: {
      category: Enum<typeof CollectionCategory>;
      id: number;
    }) => {
      if (category === CollectionCategory.GENERAL) {
        return;
      }

      await api.collections.update({
        params: {
          id,
        },
        input: {
          category,
        },
      });
    },
    onSuccess: () => {
      setNewCategory(null);
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
      <Modal
        isOpen={newCategory !== null}
        onClose={() => setNewCategory(null)}
        isAllowedClickOutside={false}
      >
        <Modal.Content flex>
          <FieldLabel>Category for collection: {newCategory?.label}</FieldLabel>
          <Select
            options={collectionCategoryOptions}
            isDisabled={collectionUpdating}
            onSelect={(value) => {
              if (newCategory) {
                mutate({ id: newCategory.value, category: value });
              }
            }}
          />
        </Modal.Content>
      </Modal>
    </Form.Section>
  );
};
