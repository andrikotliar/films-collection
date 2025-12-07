import { createFileRoute } from '@tanstack/react-router';
import {
  Awards,
  CastAndCrew,
  ContentLayout,
  Description,
  Section,
} from '~/routes/films/$id/-components';
import { useFilm } from '~/routes/films/$id/-hooks';

export const Route = createFileRoute('/films/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: film } = useFilm();
  return (
    <ContentLayout>
      {film.description && <Description rawHtml={film.description} />}
      {film.castAndCrew.length !== 0 && <CastAndCrew data={film.castAndCrew} />}
      {film.awards.length !== 0 && (
        <Section title="Awards">
          <Awards data={film.awards} />
        </Section>
      )}
    </ContentLayout>
  );
}
