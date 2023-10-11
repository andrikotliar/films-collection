import { FilledActorData, IMAGE_FALLBACKS } from '@/common';
import classes from './Character.module.css';
import { FC } from 'react';
import { handleImageError } from '@/helpers';

type CharacterProps = {
  character: FilledActorData['character'];
};

const Character: FC<CharacterProps> = ({ character }) => {
  return (
    <div className={classes.character}>
      <img
        src={character.imageUrl}
        alt={character.name}
        onError={e =>
          handleImageError(
            e,
            IMAGE_FALLBACKS.noCharacterImage,
          )
        }
      />
    </div>
  );
};

export { Character };
