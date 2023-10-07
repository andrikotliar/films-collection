import './description.css';
import { FC, useState } from 'react';
import { Description, TypeVariants } from '@/types';
import { EpisodesList, ExpandButton } from '@/pages/Film/components/Description/components';

type DescriptionProps = {
  type: TypeVariants[];
  description: Description[];
  activeIndex: number;
};

const FilmDesctiption: FC<DescriptionProps> = ({
  type,
  description,
  activeIndex
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="description">
      <h2 className="description__header">
        Description
      </h2>
      <div className="description__content">
        <div className="description__text">
          {description[activeIndex].plot}
        </div>
        {type.includes('Series') && (
          <>
            <ExpandButton
              isExpanded={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
              episodesCount={description[activeIndex].episodes.length}
            />
            {isExpanded && (
              <div className="description__episodes">
                <EpisodesList episodes={description[activeIndex].episodes} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { FilmDesctiption };