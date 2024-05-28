import { FC } from 'react';
import { MediaItem } from '@/common/types';
import { PosterImage, TrailerButton } from './components';

type MediaProps = {
  media: MediaItem;
};

const Media: FC<MediaProps> = ({ media }) => {
  return (
    <>
      <PosterImage src={media.poster} />
      <TrailerButton trailer={media.trailer} />
    </>
  );
};

export { Media };
