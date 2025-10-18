import { Nomination } from '~/routes/film/-components';
import { useFilm } from '~/routes/film/-hooks/use-film';
import { createFileRoute, Link, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/awards')({
  component: RouteComponent,
});

function RouteComponent() {
  const film = useFilm();

  if (!film.awards.length) {
    return <Navigate to="/film/$id" params={{ id: film.id.toString() }} />;
  }

  return (
    <div className="border border-slate-300 rounded-md overflow-hidden">
      {film.awards.map(({ award, nominations }) => (
        <div
          key={award.id}
          className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr] border-b border-b-slate-300 p-5 transition last:border-b-0 hover:bg-slate-50"
        >
          <div>
            <h3 className="hover:text-sky-700">
              <Link to="/" search={{ awardId: String(award.id) }} className="font-bold">
                {award.title}
              </Link>
            </h3>
            <p className="text-sm">
              {nominations.length} nomination
              {nominations.length > 1 && 's'}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {nominations.map(({ title, person, comment }, index) => (
              <Nomination title={title} key={index} nominee={person} comment={comment} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
