import {
  CollectionCategory,
  convertEnumValuesToOption,
  enumValues,
  type Enum,
  type ListOption,
} from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { FilmOrderSelect } from '~/routes/console/films_/-components/film-form/components/collections-select/components';
import {
  api,
  FieldError,
  FieldLabel,
  Form,
  Modal,
  Select,
  useAsyncModal,
  type ApiResponse,
} from '~/shared';

type CollectionsSelectProps = {
  options: ApiResponse<typeof api.initialData.get>['options']['collections'];
};

const defaultCollection: z.infer<typeof FilmFormSchema>['collections'][number] = {
  collectionId: 0,
  order: 0,
};

const collectionCategoryOptions = convertEnumValuesToOption(enumValues(CollectionCategory));

export const CollectionsSelect = ({ options }: CollectionsSelectProps) => {
  const { params, isAsyncModalOpen, openAsyncModal, closeAsyncModal } = useAsyncModal<
    string,
    Enum<typeof CollectionCategory>
  >();
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

      const category = await openAsyncModal(title);

      const result = await api.collections.create({
        input: {
          title,
          category,
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
      <Modal isOpen={isAsyncModalOpen} onClose={closeAsyncModal} isAllowedClickOutside={false}>
        {params && (
          <Modal.Content flex>
            <FieldLabel>Category for collection: {params.data}</FieldLabel>
            <Select
              options={collectionCategoryOptions}
              onSelect={params.resolve}
              isSearchable={false}
            />
          </Modal.Content>
        )}
      </Modal>
    </Form.Section>
  );
};
