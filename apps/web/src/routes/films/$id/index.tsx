import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { AwardIcon, FileTextIcon, UsersIcon } from 'lucide-react';
import {
  Awards,
  CastAndCrew,
  ContentLayout,
  Description,
  Section,
} from '~/routes/films/$id/-components';
import { getFilmQueryOptions } from '~/shared';

export const Route = createFileRoute('/films/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: film } = useSuspenseQuery(getFilmQueryOptions(+params.id));

  const isEmptyPage =
    !film.description && film.awards.length === 0 && film.castAndCrew.length === 0;

  return (
    <ContentLayout>
      {film.description && film.description.length > 50 && (
        <Section title="Description" icon={<FileTextIcon />}>
          <Description rawHtml={film.description} />
        </Section>
      )}
      {film.awards.length > 0 && (
        <Section title="Awards" icon={<AwardIcon />}>
          <Awards data={film.awards} />
        </Section>
      )}
      {film.castAndCrew.length !== 0 && (
        <Section title="Cast and Crew" icon={<UsersIcon />}>
          <CastAndCrew data={film.castAndCrew} />
        </Section>
      )}
      {isEmptyPage && <div>No information here yet</div>}
    </ContentLayout>
  );
}
