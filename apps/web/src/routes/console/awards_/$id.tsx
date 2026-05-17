import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getAwardQueryOptions, getMixedId } from '~/shared';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';

import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/awards_/$id')({
  loader: async ({ params, context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAwardQueryOptions(getMixedId(params.id)));
  },
  component: PageContainer,
  staticData: {
    title: 'Awards',
    backPath: '/console/awards',
  },
});

function PageContainer() {
  const { id } = Route.useParams();

  const { data } = useSuspenseQuery(getAwardQueryOptions(getMixedId(id)));

  const defaultValues = useMemo(() => {
    return getFormDefaultValues(data);
  }, [data]);

  return <AwardForm values={defaultValues} />;
}
