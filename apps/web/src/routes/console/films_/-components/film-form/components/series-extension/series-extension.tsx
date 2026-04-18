import { useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/-shared/schemas';
import { Form } from '~/shared';

type SeriesExtensionProps = {
  shouldShowDateSelector?: boolean;
};

export const SeriesExtension = ({ shouldShowDateSelector = true }: SeriesExtensionProps) => {
  const { watch } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const titleType = watch('type');

  if (titleType !== 'SERIES') {
    return null;
  }

  return (
    <>
      <Form.TextInput type="number" name="seriesExtension.seasonsTotal" label="Seasons total" />
      <Form.TextInput type="number" name="seriesExtension.episodesTotal" label="Episodes total" />
      {shouldShowDateSelector && (
        <Form.DatePicker name="seriesExtension.finishedAt" label="Series finished at" />
      )}
    </>
  );
};
