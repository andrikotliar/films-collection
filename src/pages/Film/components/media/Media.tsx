import { FC } from 'react';
import { MediaItem } from '@/common';
import { PosterImage, TrailerButton } from './components';

import { Column } from '../layout';

type Props = {
  media: MediaItem;
};

const Media: FC<Props> = ({ media }) => {
  return (
    <Column>
      <PosterImage src={media.poster} />
      <TrailerButton trailer={media.trailer} />
    </Column>
  );
};

export { Media };
