import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import { Image } from '~/components';

type ChapterLinkProps = {
  id: number;
  poster: string;
  title: string;
  chapter: number | null;
  isActive: boolean;
};

export const ChapterLink = ({ id, poster, title, chapter, isActive }: ChapterLinkProps) => {
  return (
    <Link
      to="/film/$id"
      params={{ id: String(id) }}
      className={classNames(
        'relative w-full aspect-[9/14] shrink-0 rounded-md border border-slate-300 overflow-hidden',
        {
          'pointer-events-none': isActive,
        },
      )}
      title={title}
    >
      <Image src={poster} alt={title} isExternal className={classNames(isActive && 'opacity-50')} />
      {chapter && (
        <span className="absolute top-0 left-0 flex items-center justify-center text-xs font-bold bg-white shadow-sm w-6 h-6 rounded-br-sm">
          {chapter}
        </span>
      )}
    </Link>
  );
};
