import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { buildMetaTitle, buildGetAwardQueryOptions, getMixedId } from '~/shared';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';

import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/awards_/$id')({
  loader: async ({ params, context: { queryClient } }) => {
    return await queryClient.ensureQueryData(buildGetAwardQueryOptions(getMixedId(params.id)));
  },
  component: PageContainer,
  staticData: {
    title: 'Awards',
    backPath: '/console/awards',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: buildMetaTitle(loaderData?.title ?? 'Awards'),
      },
    ],
  }),
});

function PageContainer() {
  const { id } = Route.useParams();

  const { data } = useSuspenseQuery(buildGetAwardQueryOptions(getMixedId(id)));

  const defaultValues = useMemo(() => {
    return getFormDefaultValues(data);
  }, [data]);

  return <AwardForm values={defaultValues} />;
}
