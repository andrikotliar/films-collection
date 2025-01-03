import { FilmsAdminListItem } from '@/types';
import { FC } from 'react';

type AdminFilmProps = {
  film: FilmsAdminListItem;
};

export const AdminFilm: FC<AdminFilmProps> = ({ film }) => {
  return <div>{film.title}</div>;
};
