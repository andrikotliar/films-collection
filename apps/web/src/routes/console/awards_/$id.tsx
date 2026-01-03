import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getAwardQueryOptions, Panel, useSuspenseAward } from '~/shared';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { NEW_ITEM_ID } from '@films-collection/shared';

export const Route = createFileRoute('/console/awards_/$id')({
  loader: async ({ params, context: { queryClient } }) => {
    if (params.id !== NEW_ITEM_ID) {
      await queryClient.ensureQueryData(getAwardQueryOptions(params.id));
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();

  const { data } = useSuspenseAward(id);

  const defaultValues = useMemo(() => {
    return getFormDefaultValues(data);
  }, [data]);

  const pageTitle = getFormTitle(defaultValues, 'Award');

  return (
    <ConsoleContentLayout title={pageTitle} backPath="/console/awards">
      <Panel>
        <AwardForm values={defaultValues} />
      </Panel>
    </ConsoleContentLayout>
  );
}
