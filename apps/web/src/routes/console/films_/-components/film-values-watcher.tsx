import { LocalStorage, type MixedId } from '~/common';
import type { FilmFormValues } from '~/routes/console/films_/-types';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type FilmValuesWatcherProps = {
  id: MixedId;
};

export const FilmValuesWatcher = ({ id }: FilmValuesWatcherProps) => {
  const { watch } = useFormContext<FilmFormValues>();

  const values = watch();

  useEffect(() => {
    const { poster: _poster, ...data } = values;

    LocalStorage.setItem(`film_${id}`, data);
  }, [values, id]);

  return null;
};
