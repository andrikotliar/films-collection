import { FC } from 'react';
import { FilmData } from '@/types';
import { DetailsGroup } from './components';

const Details: FC<{ filmData: FilmData }> = ({
  filmData,
}) => {
  const collections = filmData.collections.map(
    collection => collection.title,
  );
  return (
    <div>
      <DetailsGroup
        title="Countries"
        values={filmData.countries}
        linkParameter="countries"
      />
      <DetailsGroup
        title="Production"
        values={filmData.production}
        linkParameter="production"
      />
      <DetailsGroup
        title="Collections"
        values={collections}
        linkParameter="collections"
      />
    </div>
  );
};

export { Details };
