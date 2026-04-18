import { createFileRoute, Link } from '@tanstack/react-router';
import { useDocumentTitle } from '~/shared';

export const Route = createFileRoute('/_home/')({
  component: RootPageContainer,
});

function RootPageContainer() {
  useDocumentTitle();

  return (
    <div>
      <Link to="/films">Films</Link>
    </div>
  );
}
