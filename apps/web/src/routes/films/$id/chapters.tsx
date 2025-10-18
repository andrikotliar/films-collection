import { ChapterLink } from '~/routes/films/-components';
import { useFilm } from '~/routes/films/-hooks/use-film';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/chapters')({
  component: RouteComponent,
});

function RouteComponent() {
  const film = useFilm();

  if (!film.chapters?.length) {
    return <Navigate to="/film/$id" params={{ id: film.id.toString() }} />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-5">
      {film.chapters.map((chapter) => (
        <ChapterLink
          id={chapter.id}
          chapter={chapter.chapterOrder}
          title={chapter.title}
          isActive={chapter.id === film.id}
          poster={chapter.poster}
        />
      ))}
    </div>
  );
}
