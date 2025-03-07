import ActorNotFoundImage from '@/assets/images/not-found/actor.webp';
import CharacterNotFoundImage from '@/assets/images/not-found/character.webp';
import NoImagePreviewImage from '@/assets/images/preview/no-image-preview.webp';
import NoVideoPreviewImage from '@/assets/images/preview/no-video-preview.webp';

type ImageName =
  | 'actorNotFound'
  | 'characterNotFound'
  | 'noImagePreview'
  | 'noVideoPreview';

export const images: Record<ImageName, string> = {
  actorNotFound: ActorNotFoundImage,
  characterNotFound: CharacterNotFoundImage,
  noImagePreview: NoImagePreviewImage,
  noVideoPreview: NoVideoPreviewImage,
} as const;
