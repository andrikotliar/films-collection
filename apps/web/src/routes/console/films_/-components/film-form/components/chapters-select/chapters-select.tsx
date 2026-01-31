import type z from 'zod';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  api,
  FieldError,
  FieldLabel,
  Form,
  getChapterKeysOptionsQueryOptions,
  getFilmChaptersQueryOptions,
  Image,
  Loader,
  ScrollableLine,
} from '~/shared';
import styles from './chapters-select.module.css';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import clsx from 'clsx';
import { getVirtualChapterValue } from '~/routes/console/films_/-helpers';
import { useParams } from '@tanstack/react-router';
import type { ListOption } from '@films-collection/shared';

export const ChaptersSelect = () => {
  const { id } = useParams({ from: '/console/films_/$id' });
  const { watch, register, formState, setValue } = useFormContext<z.infer<typeof FilmFormSchema>>();
  const { data = [] } = useQuery(getChapterKeysOptionsQueryOptions());

  const chapterKey = watch('chapterKey');
  const chapterOrder = watch('chapterOrder');

  const { data: films = [], isLoading: isFilmsLoading } = useQuery(
    getFilmChaptersQueryOptions(chapterKey),
  );

  const startingVirtualChapter = getVirtualChapterValue(0, films[0]?.chapterOrder);

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
      {chapterKey && (
        <div className={styles.films}>
          <FieldLabel>Select position</FieldLabel>
          <ScrollableLine>
            {films.length === 0 && (
              <label className={clsx(styles.film, styles.position_select)}>
                <input type="radio" {...register('chapterOrder')} value={startingVirtualChapter} />
              </label>
            )}
            {films.map((film, index) => {
              const virtualChapter = getVirtualChapterValue(
                film.chapterOrder,
                films[index + 1]?.chapterOrder,
              );
              const isChapterSelected = film.chapterOrder === chapterOrder;
              const isNextChapterSelected = films[index + 1]?.chapterOrder === chapterOrder;
              return (
                <div key={film.id} className={styles.chapter_section}>
                  {index === 0 && (
                    <label className={clsx(styles.film, styles.position_select)}>
                      <input
                        type="radio"
                        {...register('chapterOrder')}
                        value={startingVirtualChapter}
                        defaultChecked={film.chapterOrder === startingVirtualChapter}
                      />
                      <span className={styles.chapter_number}>{index + 1}</span>
                    </label>
                  )}
                  <div
                    className={clsx(styles.film, {
                      [styles.selected_film]: isChapterSelected,
                    })}
                  >
                    <Image src={film.poster} className={styles.poster_select_image} />
                  </div>
                  {film.id !== Number(id) && !isNextChapterSelected && (
                    <label className={clsx(styles.film, styles.position_select)}>
                      <input
                        type="radio"
                        {...register('chapterOrder')}
                        value={virtualChapter}
                        defaultChecked={film.chapterOrder === virtualChapter}
                      />
                      <span className={styles.chapter_number}>{index + 2}</span>
                    </label>
                  )}
                </div>
              );
            })}
          </ScrollableLine>
        </div>
      )}
      <FieldError error={formState.errors.chapterOrder?.message} />
    </Form.Section>
  );
};
