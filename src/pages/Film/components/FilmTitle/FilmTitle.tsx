import { FC } from 'react';
import './film-title.css';

const FilmTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <h1 className="film-title">{title}</h1>
  );
};

export { FilmTitle };