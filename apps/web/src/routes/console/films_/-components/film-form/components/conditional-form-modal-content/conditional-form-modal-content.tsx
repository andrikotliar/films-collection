import { PersonForm } from '~/routes/console/-shared';
import { ChapterForm } from '~/routes/console/films_/-components/film-form/components/chapter-form/chapter-form';
import type { FormComponentProps, MixedId } from '~/shared';

type ConditionalFormModalContentProps = FormComponentProps<{
  id: MixedId;
  name?: string;
  key?: string;
}>;

export const ConditionalFormModalContent = ({ values }: ConditionalFormModalContentProps) => {
  if (typeof values.key === 'string') {
    return <ChapterForm values={{ key: values.key }} />;
  }

  if (typeof values.name === 'string') {
    return <PersonForm values={{ name: values.name, id: values.id }} />;
  }

  return <></>;
};
