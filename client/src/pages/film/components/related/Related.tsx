import { FC, useState } from 'react';
import { TabContent } from '@/pages/film/components/related/components';
import { useRelated } from '@/pages/film/components/related/hooks';
import { RelatedFilms } from '@/types';
import styles from './Related.module.css';
import classNames from 'classnames';

type RelatedFilmsProps = {
  data: RelatedFilms;
  filmId: string;
};

const Related: FC<RelatedFilmsProps> = ({ data, filmId }) => {
  const relatedFilmsTabs = useRelated(data, filmId);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className={styles.tabs}>
        {relatedFilmsTabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabIndex(index)}
            className={classNames(styles.tabButton, {
              [styles.activeTabButton]:
                tab.id === relatedFilmsTabs[activeTabIndex].id,
            })}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <TabContent
        data={relatedFilmsTabs[activeTabIndex].content}
        currentFilmId={filmId}
        isNumerationShown={relatedFilmsTabs[activeTabIndex].isNumerationShown}
      />
    </div>
  );
};

export { Related };
