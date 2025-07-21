import NoImagePreviewImage from './not-found/no-image-preview.webp';
import NoVideoPreviewImage from './not-found/no-video-preview.webp';

type ImageName = 'noImagePreview' | 'noVideoPreview';

export const images: Record<ImageName, string> = {
  noImagePreview: NoImagePreviewImage,
  noVideoPreview: NoVideoPreviewImage,
} as const;
