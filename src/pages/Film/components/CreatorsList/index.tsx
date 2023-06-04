import { FC } from "react";
import KeyValues from "../KeyValues";
import { GeneralFilm } from "@/types";

const CreatorsList: FC<{ filmData: GeneralFilm }> = ({ filmData }) => {
  return (
    <div>
      <KeyValues
        title="Directed by"
        linkParameter="directedBy"
        values={filmData.directedBy}
      />
      {filmData.writtenBy && (
        <KeyValues
          title="Written by"
          values={filmData.writtenBy}
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