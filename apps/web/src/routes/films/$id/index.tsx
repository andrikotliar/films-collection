import { createFileRoute } from '@tanstack/react-router';
import {
  Awards,
  CastAndCrew,
  ContentLayout,
  Description,
  Section,
} from '~/routes/films/$id/-components';
import { useSuspenseFilm } from '~/shared';

export const Route = createFileRoute('/films/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: film } = useSuspenseFilm(+params.id);
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
