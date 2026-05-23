import { ArticleContent, getPageContentByKeyQueryOptions } from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/about')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getPageContentByKeyQueryOptions('about'));
  },
  component: AboutPageContainer,
  head: () => ({
    meta: [{ title: 'About - Films Collection' }],
  }),
});

function AboutPageContainer() {
  const { data: article } = useSuspenseQuery(getPageContentByKeyQueryOptions('about'));

  return (
    <ArticleContent>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </ArticleContent>
  );
}
