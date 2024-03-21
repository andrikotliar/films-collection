import { FC } from 'react';
import { MediaItem } from '@/common/types';
import { PosterImage, TrailerButton } from './components';

type Props = {
  media: MediaItem;
};

const Media: FC<Props> = ({ media }) => {
  return (
    <>
      <PosterImage src={media.poster} />
      <TrailerButton trailer={media.trailer} />
    </>
  );
};

export { Media };
