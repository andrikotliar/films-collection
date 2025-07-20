import NoImagePreviewImage from '@/assets/images/preview/no-image-preview.webp';
import NoVideoPreviewImage from '@/assets/images/preview/no-video-preview.webp';

type ImageName = 'noImagePreview' | 'noVideoPreview';

export const images: Record<ImageName, string> = {
  noImagePreview: NoImagePreviewImage,
  noVideoPreview: NoVideoPreviewImage,
} as const;
