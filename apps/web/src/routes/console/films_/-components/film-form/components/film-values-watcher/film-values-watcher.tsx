import { api, countObjectKeys, debounce, getObjectsDiff } from '~/shared';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import type z from 'zod';
import type { FilmDraftResponse } from '@films-collection/shared';
import { useParams } from '@tanstack/react-router';
import { getDraftIdFromMixedId } from '~/routes/console/films_/-helpers';
import { filmDefaultFormValues } from '~/routes/console/films_/-configs';

type FilmValuesWatcher = {
  selectedDraft: FilmDraftResponse | null;
  onDraftCreated: (draft: FilmDraftResponse) => void;
};

export const FilmValuesWatcher = ({ selectedDraft, onDraftCreated }: FilmValuesWatcher) => {
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

      const diff = getObjectsDiff({ ...filmDefaultFormValues, isDraft: false }, content);
      const countChangedParams = diff ? countObjectKeys(diff) : 0;

      if (!countChangedParams) {
        return;
      }

      api.films.createDraft
        .exec({
          input: { content },
          params: { id: getDraftIdFromMixedId(params.id) },
        })
        .then(onDraftCreated);
    }, 2000),
    [selectedDraft, params.id],
  );

  useEffect(() => {
    const cleanup = debouncedChange(values);

    return () => {
      cleanup();
    };
  }, [values]);

  return null;
};
