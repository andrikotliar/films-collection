import { FC } from 'react';

type Props = {
  name: string;
  filmsCount: number;
  genres: string[];
  years: string[];
};

const ActorData: FC<Props> = ({ name, filmsCount, genres, years }) => {
  return (
    <div>
      {name}
      {filmsCount}
      {genres}
      {years}
    </div>
  );
};

export { ActorData };
