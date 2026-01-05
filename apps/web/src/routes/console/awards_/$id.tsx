import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getAwardQueryOptions, getMixedId, isNewItem, Panel } from '~/shared';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/awards_/$id')({
  loader: async ({ params, context: { queryClient } }) => {
    if (!isNewItem(params.id)) {
      await queryClient.ensureQueryData(getAwardQueryOptions(+params.id));
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();

  const { data } = useSuspenseQuery(getAwardQueryOptions(getMixedId(id)));

  const defaultValues = useMemo(() => {
    return getFormDefaultValues(data);
  }, [data]);

  return (
    <ConsoleContentLayout title={getFormTitle(defaultValues, 'Award')} backPath="/console/awards">
      <Panel>
        <AwardForm values={defaultValues} />
      </Panel>
    </ConsoleContentLayout>
  );
}
