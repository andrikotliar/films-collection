import { CollectionCategory, type ListOption } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useMatches, useParams } from '@tanstack/react-router';
import type z from 'zod';
import { CollectionsSelect, getFormTitle, useFormModal } from '~/routes/console/-shared';
import { HobbyItemFormSchema } from '~/routes/console/hobbies_/-schemas/hobby-item-schema';
import {
  api,
  Form,
  getAllCollectionOptionsQueryOptions,
  getHobbyItemsByCollectionQueryOptions,
  getObjectsDiff,
  isNewItem,
  queryKey,
  uploadImage,
  type FormComponentProps,
} from '~/shared';

type HobbyItemFormProps = FormComponentProps<z.infer<typeof HobbyItemFormSchema>>;

export const HobbyItemForm = ({ values }: HobbyItemFormProps) => {
  const { data: collectionOptions } = useSuspenseQuery(getAllCollectionOptionsQueryOptions());
  const { id: hobbyId } = useParams({ from: '/console/hobbies_/$id' });

  const { onClose } = useFormModal();

  const matches = useMatches();

  const hobbyItemMutation = useMutation({
    mutationFn: async (input: z.infer<typeof HobbyItemFormSchema>) => {
      const { id: hobbyItemId, ...data } = input;
      const currentRoute = matches.at(-1);
      const loaderData = currentRoute?.loaderData as Record<string, string | number>;
      const pageTitle = loaderData.title;

      const imageUrl = await uploadImage({
        image: data.imageUrl,
        title: input.title,
        folder: pageTitle ? String(pageTitle) : 'hobby_items',
      });

      const finalInput = {
        ...data,
        imageUrl,
      };

      if (!isNewItem(hobbyItemId)) {
        const { id: _, ...defaultValues } = values;
        const diff = getObjectsDiff(defaultValues, finalInput);

        if (!diff) {
          return;
        }

        return await api.hobbies.updateHobbyItem({
          params: {
            id: +hobbyId,
            itemId: hobbyItemId,
          },
          input: diff,
        });
      }

      return await api.hobbies.createHobbyItem({
        input: {
          ...data,
          imageUrl,
        },
        params: {
          id: +hobbyId,
        },
      });
    },
    onSuccess: () => {
      onClose();
    },
    meta: {
      invalidateQueries: {
        queryKey: queryKey('hobbies.getHobbyAdmin', +hobbyId),
      },
    },
  });

  const createPersonMutation = useMutation({
    mutationFn: async (value: string): Promise<ListOption<number>> => {
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
    <Form
      onSubmit={hobbyItemMutation.mutate}
      title={getFormTitle(values, 'hobby item')}
      defaultValues={values}
      schema={HobbyItemFormSchema}
      isLoading={false}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.TextArea name="description" label="Description" />
      <Form.TextInput type="number" name="releaseYear" label="Release year" />
      <Form.FileInput name="imageUrl" label="Image" />
      <CollectionsSelect
        options={collectionOptions}
        getCurrentCollection={getHobbyItemsByCollectionQueryOptions}
        defaultCategory={CollectionCategory.CHAPTER}
        currentItemId={values.id}
      />
      <Form.AsyncSelect
        label="Authors"
        isMulti
        name="people"
        optionsLoader={api.people.search}
        queryKeyParams={{ key: queryKey('people.search')[0], values: values.people }}
        onCreateOption={createPersonMutation.mutateAsync}
        isOptionsLoading={createPersonMutation.isPending}
      />
    </Form>
  );
};
