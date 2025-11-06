import {
  fetchPageContentByKeyQuery,
  ArticleContent,
  useDocumentTitle,
  useScrollToTop,
} from '~/lib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchPageContentByKeyQuery('about'));
  },
  component: AboutPageContainer,
});

function AboutPageContainer() {
  useDocumentTitle('About');
  useScrollToTop([]);

  const { data: article } = useSuspenseQuery(fetchPageContentByKeyQuery('about'));

  return (
    <ArticleContent>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </ArticleContent>
  );
}
