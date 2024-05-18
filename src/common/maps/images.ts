import ActorNotFoundImage from '@/assets/images/not-found/actor.webp';
import CharacterNotFoundImage from '@/assets/images/not-found/character.webp';

type ImageName = 'actorNotFound' | 'characterNotFound';

const images: Record<ImageName, string> = {
  actorNotFound: ActorNotFoundImage,
  characterNotFound: CharacterNotFoundImage,
} as const;

export { images };
