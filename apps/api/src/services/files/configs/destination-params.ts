import type { CommonTransformationOptions, ImageFormat } from 'cloudinary';
import type { FileDestination } from '../types';

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
};
