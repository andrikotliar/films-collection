import KeyValues from "../KeyValues";

const CreatorsList = ({ filmData }) => {
  return (
    <div>
      {!filmData.type.includes('Series') ? (
        <>
          <KeyValues
            title="Directed by"
            linkParameter="directedBy"
            values={filmData.directedBy}
          />
          <KeyValues
            title="Written by"
            values={filmData.writtenBy}
          />
        </>
      ) : (
        <KeyValues
          title="Created by"
          linkParameter="createdBy"
          values={filmData.createdBy}
        />
      )}
      <KeyValues
        title="Produced by"
        values={filmData.producedBy}
      />
      <KeyValues
        title="Music by"
        values={filmData.musicBy}
      />
      {filmData.cinematographyBy && (
        <KeyValues
          title="Cinematography by"
          values={filmData.cinematographyBy}
        />
      )}
    </div>
  );
};

export default CreatorsList;