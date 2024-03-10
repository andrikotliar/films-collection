import { CastType, IMAGE_FALLBACKS } from '@/common';
import styles from './Character.module.css';
import { FC } from 'react';
import { handleImageError } from '@/utils';

type Props = {
  character: CastType['character'];
};

const Character: FC<Props> = ({ character }) => {
  return (
    <div className={styles.character}>
      <img
        src={character.imageUrl || ''}
        alt={character.name}
        onError={(e) => handleImageError(e, IMAGE_FALLBACKS.noCharacterImage)}
      />
    </div>
  );
};

export { Character };
