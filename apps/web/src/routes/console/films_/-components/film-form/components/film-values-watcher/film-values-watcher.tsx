import { api, countObjectKeys, debounce, getObjectsDiff } from '~/shared';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FilmFormSchema } from '~/routes/console/-shared/schemas';
import type z from 'zod';
import type { FilmDraftResponse } from '@films-collection/shared';
import { useParams } from '@tanstack/react-router';

type FilmValuesWatcher = {
  selectedDraft: FilmDraftResponse | null;
  formDefaultValues: z.infer<typeof FilmFormSchema>;
  onDraftCreated: (draft: FilmDraftResponse) => void;
};

export const FilmValuesWatcher = ({
  selectedDraft,
  onDraftCreated,
  formDefaultValues,
}: FilmValuesWatcher) => {
  const { watch } = useFormContext<z.infer<typeof FilmFormSchema>>();
  const params = useParams({ from: '/console/films_/$id' });

  const values = watch();

  const debouncedChange = useCallback(
    debounce((content) => {
      if (selectedDraft) {
        const diff = getObjectsDiff(selectedDraft.content, content);
        const countChangedParams = diff ? countObjectKeys(diff) : 0;

        if (!countChangedParams) {
          return;
        }

        api.films.updateDraft.exec({
          params: {
            id: selectedDraft.id,
          },
          input: {
            content,
          },
        });
        return;
      }

      const diff = getObjectsDiff(formDefaultValues, content);
      const countChangedParams = diff ? countObjectKeys(diff) : 0;

      if (!countChangedParams) {
        return;
      }

      api.films.createDraft
        .exec({
          input: { content },
          params: { filmId: params.id },
        })
        .then(onDraftCreated);
    }, 2000),
    [selectedDraft, formDefaultValues, params.id],
  );

  useEffect(() => {
    const cleanup = debouncedChange(values);

    return () => {
      cleanup();
    };
  }, [values]);

  return null;
};
