import {
  ArticleContent,
  getFilmByCollectionNameAndOrderQueryOptions,
  getPageContentByKeyQueryOptions,
  PageTitle,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AboutPageLayout } from '~/routes/about/-components/about-page-layout/about-page-layout';
import { AboutPageContent } from '~/routes/about/-components/about-page-content/about-page-content';
import { SelectedFilm } from '~/routes/about/-components/selected-film/selected-film';

export const Route = createFileRoute('/about')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getPageContentByKeyQueryOptions('about'));
    await queryClient.ensureQueryData(getFilmByCollectionNameAndOrderQueryOptions('Top 10'));
  },
  component: AboutPageContainer,
  head: () => ({
    meta: [{ title: 'About - Films Collection' }],
  }),
});

function AboutPageContainer() {
  const { data: article } = useSuspenseQuery(getPageContentByKeyQueryOptions('about'));
  const { data: film } = useSuspenseQuery(getFilmByCollectionNameAndOrderQueryOptions('Top 10'));

  return (
    <AboutPageLayout>
      <PageTitle>{article.title}</PageTitle>
      <AboutPageContent>
        <ArticleContent>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </ArticleContent>
        <SelectedFilm data={film} />
      </AboutPageContent>
    </AboutPageLayout>
  );
}
