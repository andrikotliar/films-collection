import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Panel, fetchAwardByIdQuery, NEW_ITEM_ID } from '~/shared';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { ConsoleContentLayout } from '~/routes/console/-shared';

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
    <ConsoleContentLayout title={pageTitle} backPath="/console/general/awards">
      <Panel>
        <AwardForm values={defaultValues} />
      </Panel>
    </ConsoleContentLayout>
  );
}
