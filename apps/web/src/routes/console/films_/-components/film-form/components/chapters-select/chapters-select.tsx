import type z from 'zod';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  api,
  FieldError,
  Form,
  getChapterKeysOptionsQueryOptions,
  getFilmChaptersQueryOptions,
  Loader,
} from '~/shared';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import { useParams } from '@tanstack/react-router';
import type { ListOption } from '@films-collection/shared';

export const ChaptersSelect = () => {
  const { id } = useParams({ from: '/console/films_/$id' });
  const { watch, formState, setValue } = useFormContext<z.infer<typeof FilmFormSchema>>();
  const { data = [] } = useQuery(getChapterKeysOptionsQueryOptions());

  const chapterKey = watch('chapterKey');

  const { data: films = [], isLoading: isFilmsLoading } = useQuery(
    getFilmChaptersQueryOptions(chapterKey),
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (value: string): Promise<ListOption<string>> => {
      if (!value.length) {
        throw new Error('Chapter Key cannot be empty');
      }

      const result = await api.chapterKeys.create({
        input: {
          key: value,
        },
      });

      return {
        value: result.key,
        label: result.key,
      };
    },
  });

  return (
    <Form.Section label="Chapters">
      <Form.Select
        options={data}
        name="chapterKey"
        placeholder="Select existing key"
        onClear={() => setValue('chapterOrder', null)}
        onCreateOption={mutateAsync}
        isOptionsLoading={isPending}
      />
      {isFilmsLoading && <Loader />}
      {chapterKey && <Form.OrderSelect list={films} name="chapterOrder" currentId={Number(id)} />}
      <FieldError error={formState.errors.chapterOrder?.message} />
    </Form.Section>
  );
};
