import type z from 'zod';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
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
import { useFormModal } from '~/routes/console/-shared';

type DefineValueParams = {
  chapterOrder: number | null;
  nextChapterOrder?: number | null;
};

const defineValue = ({ chapterOrder, nextChapterOrder }: DefineValueParams) => {
  if (chapterOrder === null) {
    return 1;
  }

  if (!nextChapterOrder) {
    return chapterOrder + 1;
  }

  return (chapterOrder + nextChapterOrder) / 2;
};

export const ChaptersSelect = () => {
  const { watch, register, formState, setValue } = useFormContext<z.infer<typeof FilmFormSchema>>();
  const { data = [] } = useQuery(getChapterKeysOptionsQueryOptions());
  const { onOpen } = useFormModal();

  const chapterKey = watch('chapterKey');
  const chapterOrder = watch('chapterOrder');

  const { data: films = [], isLoading: isFilmsLoading } = useQuery(
    getFilmChaptersQueryOptions(chapterKey),
  );

  return (
    <Form.Section label="Chapters">
      <Form.Select
        options={data}
        name="chapterKey"
        placeholder="Select existing key"
        onClear={() => setValue('chapterOrder', null)}
        onCreateOption={() => onOpen({ key: '' })}
      />
      {isFilmsLoading && <Loader />}
      {chapterKey && (
        <div className={styles.films}>
          <FieldLabel>Select previous chapter</FieldLabel>
          <ScrollableLine>
            <label className={clsx(styles.film_select, styles.empty_film)}>
              <input
                type="radio"
                value={defineValue({
                  chapterOrder: 0,
                  nextChapterOrder: films[0]?.chapterOrder,
                })}
                {...register('chapterOrder')}
                defaultChecked={!!chapterOrder && chapterOrder <= 1}
                key={chapterKey}
              />
            </label>
            {films.map((film, index) => {
              const value = defineValue({
                chapterOrder: film.chapterOrder,
                nextChapterOrder: films[index + 1]?.chapterOrder,
              });
              return (
                <label key={film.id} className={styles.film_select}>
                  <input
                    type="radio"
                    value={value}
                    {...register('chapterOrder')}
                    defaultChecked={chapterOrder === value}
                  />
                  <Image isExternal src={film.poster} className={styles.poster_select_image} />
                </label>
              );
            })}
          </ScrollableLine>
        </div>
      )}
      <FieldError error={formState.errors.chapterOrder?.message} />
    </Form.Section>
  );
};
