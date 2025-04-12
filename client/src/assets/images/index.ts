import ActorNotFoundImage from '@/assets/images/not-found/actor.webp';
import NoImagePreviewImage from '@/assets/images/preview/no-image-preview.webp';
import NoVideoPreviewImage from '@/assets/images/preview/no-video-preview.webp';

type ImageName = 'actorNotFound' | 'noImagePreview' | 'noVideoPreview';

export const images: Record<ImageName, string> = {
  actorNotFound: ActorNotFoundImage,
  noImagePreview: NoImagePreviewImage,
  noVideoPreview: NoVideoPreviewImage,
} as const;
