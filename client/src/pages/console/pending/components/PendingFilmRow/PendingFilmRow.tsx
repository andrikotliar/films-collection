import { PendingFilm } from '@/types';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

type PendingFilmRowProps = {
  data: PendingFilm;
};

export const PendingFilmRow: FC<PendingFilmRowProps> = ({ data }) => {
  return (
    <div>
      {data.title}
      {data.priority}
      <Link to="/console/manage">Create film</Link>
    </div>
  );
};
