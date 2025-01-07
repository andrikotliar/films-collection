import { FC } from 'react';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import { VideoPreview } from '../VideoPreview/VideoPreview';

type PreviewProps = {
  baseUrl: string;
  url: string;
  type: 'image' | 'video';
};

export const Preview: FC<PreviewProps> = ({ baseUrl, url, type }) => {
  switch (type) {
    case 'image':
      return <ImagePreview baseUrl={baseUrl} path={url} />;
    case 'video':
      return <VideoPreview baseUrl={baseUrl} videoId={url} />;
    default:
      return null;
  }
};
