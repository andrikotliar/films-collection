import KeyValues from '../KeyValues';

const ExtraDetails = ({ filmData }) => {
  const collections = filmData.collections.map((collection) => collection.name);
  return (
    <div className="details-group">
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
        title="Collections"
        values={collections}
        linkParameter="collections"
      />
    </div>
  );
};

export default ExtraDetails;