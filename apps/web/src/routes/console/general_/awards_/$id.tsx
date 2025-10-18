import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  BackLink,
  ConsoleContent,
  ConsoleTitle,
  Panel,
  fetchAwardByIdQuery,
  NEW_ITEM_ID,
} from '~/common';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';
import { getFormTitle } from '~/routes/console/-common/helpers';

export const Route = createFileRoute('/console/general_/awards_/$id')({
  loader: async ({ params, context: { queryClient } }) => {
    if (params.id !== NEW_ITEM_ID) {
      await queryClient.ensureQueryData(fetchAwardByIdQuery(params.id));
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();

  const { data } = useSuspenseQuery(fetchAwardByIdQuery(id));

  const defaultValues = useMemo(() => {
    return getFormDefaultValues(data);
  }, [data]);

  const pageTitle = getFormTitle(defaultValues, 'Award');

  return (
    <ConsoleContent>
      <BackLink path="/console/general/awards">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <Panel>
        <AwardForm values={defaultValues} />
      </Panel>
    </ConsoleContent>
  );
}
