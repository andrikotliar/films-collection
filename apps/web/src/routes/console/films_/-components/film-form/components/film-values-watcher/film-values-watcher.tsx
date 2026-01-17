import { LocalStorage, type MixedId } from '~/shared';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import type z from 'zod';

type FilmValuesWatcherProps = {
  id: MixedId;
};

export const FilmValuesWatcher = ({ id }: FilmValuesWatcherProps) => {
  const { getValues } = useFormContext<z.infer<typeof FilmFormSchema>>();

  useEffect(() => {
    const interval = setInterval(() => {
      const formValues = getValues();

      if (typeof formValues.poster === 'string') {
        LocalStorage.setItem(`film_${id}`, formValues);
        return;
      }

      const { poster: _poster, ...data } = formValues;

      LocalStorage.setItem(`film_${id}`, data);
    }, 10_000);

    return () => {
      clearInterval(interval);
    };
  }, [id]);

  return null;
};
