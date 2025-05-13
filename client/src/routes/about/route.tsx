import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { fetchPostByKeyQuery } from '@/queries';
import { ArticleContent } from '@/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchPostByKeyQuery('about'));
  },
  component: AboutPageContainer,
});

function AboutPageContainer() {
  useDocumentTitle('About');
  useScrollToTop([]);

  const { data: article } = useSuspenseQuery(fetchPostByKeyQuery('about'));

  return (
    <ArticleContent>
      <h1>About</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </ArticleContent>
  );
}
