import { ReactEventHandler } from 'react';

type HandleImageError = (
  imageSource: string,
) => ReactEventHandler<HTMLImageElement>;

const handleImageError: HandleImageError = (imageSource) => {
  return (event) => {
    event.currentTarget.src = imageSource;
  };
};

export { handleImageError };
