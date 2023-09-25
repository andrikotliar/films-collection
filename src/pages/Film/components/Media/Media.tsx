import './media.css';
import { FC, useState } from 'react';
import { Poster } from "@/pages/Film/components/Poster";
import { Trailer } from "@/pages/Film/components/Trailer";
import { TypeVariants } from '@/types';
import { SeasonSelector } from '@/components';

type MediaProps = {
  type: TypeVariants[];
  posters: string[];
  title: string;
  trailers: string[];
}

const Media: FC<MediaProps> = ({
  type,
  posters,
  title,
  trailers
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = trailers.length > 1 && trailers.map((_, index) => ({
    title: `Season ${index + 1}`,
  }));

  return (
    <div className="media">
      {options && (
        <div className="media__select">
          <SeasonSelector
            onChange={(e) => setActiveIndex(+e.target.value)}
            options={options}
          />
        </div>
      )}
      <Poster poster={posters[activeIndex]} title={title} />
      <Trailer trailer={trailers[activeIndex]} />
    </div>
  );
};

export { Media };