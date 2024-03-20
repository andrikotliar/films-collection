import styles from './Description.module.css';
import { FC, useState } from 'react';
import { MediaItem, SeasonType } from '@/common';
import { DataArea } from '@/components';
import { SeriesHeader } from '@/pages/Film/components/Description/components';

type Props = {
  description: string[];
  media: MediaItem[];
  seasons?: SeasonType[];
};

const Description: FC<Props> = ({ description, seasons }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <SeriesHeader
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        seasons={seasons}
      />
      <DataArea className={styles.wrapper}>
        <div className={styles.description}>{description[activeIndex]}</div>
      </DataArea>
    </div>
  );
};

export { Description };
