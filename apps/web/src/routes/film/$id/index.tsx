import { RoleItem } from '~/routes/film/-components';
import { useFilm } from '~/routes/film/-hooks/use-film';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const film = useFilm();

  if (!film.castAndCrew?.length) {
    return null;
  }

  return (
    <div className="border border-slate-300 rounded-md">
      {film.castAndCrew.map((personData) => (
        <RoleItem data={personData} key={personData.role} />
      ))}
    </div>
  );
}
