import { FilmData } from '@/types';
import { FC } from 'react';
import ExtraDetailsItem from './components/ExtraDetailsItem';

const ExtraDetails: FC<{ filmData: FilmData }> = ({ filmData }) => {
  const collections = filmData.collections.map((collection) => collection.title);
  return (
    <div className="details-group">
      <ExtraDetailsItem
        title="Countries"
        values={filmData.countries}
        linkParameter="countries"
      />
      <ExtraDetailsItem
        title="Production"
        values={filmData.production}
        linkParameter="production"
      />
      <ExtraDetailsItem
        title="Collections"
        values={collections}
        linkParameter="collections"
      />
    </div>
  );
};

export default ExtraDetails;