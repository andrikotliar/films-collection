import './description.css';
import { FC, useState } from 'react';
import { Description, TypeVariants } from '@/types';
import { EpisodesTable } from '@/pages/Film/components/Description/components';
import { SeasonSelector } from '@/components';

type DescriptionProps = {
  type: TypeVariants[];
  description: Description[];
};

const FilmDesctiption: FC<DescriptionProps> = ({
  type,
  description
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="description">
      <div className="description__header">
        <h2>
          Description
        </h2>
        {type.includes('Series') && description.length > 1 && (
          <SeasonSelector
            options={description}
            onChange={(e) => setActiveIndex(+e.target.value)}
          />
        )}
      </div>
      <div className="description__content">
        <div className="description__text">
          {description[activeIndex].plot}
        </div>
        {type.includes('Series') && (
          <div className="description__episodes">
            <EpisodesTable episodes={description[activeIndex].episodes} />
          </div>
        )}
      </div>
    </div>
  );
};

export { FilmDesctiption };