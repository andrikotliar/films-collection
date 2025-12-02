import { CommonTransformationOptions, ImageFormat } from 'cloudinary';
import { FileDestination } from '../types';

type DestinationParams = {
  [key in FileDestination]: {
    path: string;
    transformation?: CommonTransformationOptions;
    format?: ImageFormat;
  };
};

export const destinationParams: DestinationParams = {
  posters: {
    path: 'posters',
    transformation: {
      height: 600,
    },
    format: 'webp',
  },
  actors: {
    path: 'actors',
    transformation: {
      width: 200,
      height: 300,
      crop: 'fill',
    },
    format: 'webp',
  },
  decoration: {
    path: 'decoration',
  },
  awards: {
    path: 'awards',
  },
};
