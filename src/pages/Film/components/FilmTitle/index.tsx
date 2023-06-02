import { FC } from 'react';
import './styles.css';

const FilmTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <h1 className="film__title">{title}</h1>
  );
};

export default FilmTitle;