import { FC } from 'react';
import { MediaItem } from '@/common/types';
import { buildMediaPath } from '@/helpers';

type MediaProps = {
  media: MediaItem;
};

const Media: FC<MediaProps> = ({ media }) => {
  const posterUrl = buildMediaPath('posters', media.poster);

  return (
    <button onClick={() => {}}>
      <img src={posterUrl} />
    </button>
  );
};

export { Media };
