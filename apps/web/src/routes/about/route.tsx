import { ArticleContent, getArticlesBySlugQueryOptions, PageTitle } from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Content, Layout } from '~/routes/about/-components';

export const Route = createFileRoute('/about')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getArticlesBySlugQueryOptions('about'));
  },
  component: AboutPageContainer,
  head: () => ({
    meta: [{ title: 'About - Films Collection' }],
  }),
});

function AboutPageContainer() {
  const { data: article } = useSuspenseQuery(getArticlesBySlugQueryOptions('about'));

  return (
    <Layout>
      <Content>
        <PageTitle>{article.title}</PageTitle>
        <ArticleContent>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </ArticleContent>
      </Content>
    </Layout>
  );
}
