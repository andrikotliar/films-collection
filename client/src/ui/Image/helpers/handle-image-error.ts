import { ReactEventHandler } from 'react';

type HandleImageError = (
  imageSource: string,
) => ReactEventHandler<HTMLImageElement>;

export const handleImageError: HandleImageError = (imageSource) => {
  return (event) => {
    event.currentTarget.src = imageSource;
  };
};
