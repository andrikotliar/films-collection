import {
  ArticleContent,
  getFilmByCollectionNameAndOrderQueryOptions,
  getArticlesBySlugQueryOptions,
  PageTitle,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Content, SelectedFilm, Layout } from '~/routes/about/-components';

export const Route = createFileRoute('/about')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getArticlesBySlugQueryOptions('about'));
    await queryClient.ensureQueryData(getFilmByCollectionNameAndOrderQueryOptions('Top 10'));
  },
  component: AboutPageContainer,
  head: () => ({
    meta: [{ title: 'About - Films Collection' }],
  }),
});

function AboutPageContainer() {
  const { data: article } = useSuspenseQuery(getArticlesBySlugQueryOptions('about'));
  const { data: film } = useSuspenseQuery(getFilmByCollectionNameAndOrderQueryOptions('Top 10'));

  return (
    <Layout>
      <PageTitle>{article.title}</PageTitle>
      <Content>
        <ArticleContent>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </ArticleContent>
        <SelectedFilm data={film} />
      </Content>
    </Layout>
  );
}
