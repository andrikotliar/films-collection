import { FC } from 'react';
import { handleImageError } from '@/helpers';
import { CastType } from '@/common/types';
import { images } from '@/common/maps';

import styles from './Character.module.css';

type Props = {
  character: CastType['character'];
};

const Character: FC<Props> = ({ character }) => {
  return (
    <div className={styles.character}>
      <img
        src={character.imageUrl || ''}
        alt={character.name}
        onError={handleImageError(images.characterNotFound)}
      />
    </div>
  );
};

export { Character };
