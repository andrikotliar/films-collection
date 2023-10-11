import { SyntheticEvent } from 'react';

const handleImageError = (
  event: SyntheticEvent<HTMLImageElement>,
  image: string,
) => {
  event.currentTarget.src = image;
};

export { handleImageError };
