import { useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import { Form } from '~/shared';

export const SeriesExtension = () => {
  const { watch } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const titleType = watch('type');

  if (titleType !== 'SERIES') {
    return null;
  }

  return (
    <>
      <Form.TextInput type="number" name="seriesExtension.seasonsTotal" label="Seasons total" />
      <Form.TextInput type="number" name="seriesExtension.episodesTotal" label="Episodes total" />
      <Form.DatePicker name="seriesExtension.finishedAt" label="Series finished at" />
    </>
  );
};
