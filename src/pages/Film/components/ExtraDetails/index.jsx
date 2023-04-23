import KeyValues from '../KeyValues';
import { buildRuntimeValue } from '@/heplers';

const ExtraDetails = ({ filmData }) => {
  return (
    <div className="details-group">
      <KeyValues
        title="Runtime"
        values={buildRuntimeValue(filmData.duration)}
      />
      <KeyValues
        title="Countries"
        values={filmData.countries}
        linkParameter="countries"
      />
      <KeyValues
        title="Production"
        values={filmData.production}
        linkParameter="production"
      />
      <KeyValues
        title="Release date"
        values=""
      />
    </div>
  );
};

export default ExtraDetails;