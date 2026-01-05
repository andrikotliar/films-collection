import {
  ArticleContent,
  getPageContentByKeyQueryOptions,
  useDocumentTitle,
  useScrollToTop,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getPageContentByKeyQueryOptions('about'));
  },
  component: AboutPageContainer,
});

function AboutPageContainer() {
  useDocumentTitle('About');
  useScrollToTop([]);

  const article = Route.useLoaderData();

  return (
    <ArticleContent>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </ArticleContent>
  );
}
