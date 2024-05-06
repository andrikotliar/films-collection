import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAwardsConfig } from '@/configs';
import { Award } from '@/common/types';
import { useDataContext } from '@/context';
import { buildQueryLink } from '@/helpers';
import { Nomination } from './components';
import styles from './Awards.module.css';
import { DataArea, DataGrid } from '@/components';

type Props = {
  awards: Award[];
};

const Awards: FC<Props> = ({ awards }) => {
  const { actors } = useDataContext();
  const awardsConfig = useMemo(() => getAwardsConfig({ size: 100 }), []);

  return (
    <DataArea className={styles.wrapper}>
      {awards.map(({ awardId, nominations }) => (
        <div key={awardId} className={styles.award}>
          <Link to={buildQueryLink('awards', awardId)}>
            {awardsConfig[awardId].icon}
          </Link>
          <div className={styles.rightColumn}>
            <Link
              to={buildQueryLink('awards', awardId)}
              className={styles.title}
            >
              {awardsConfig[awardId].title}
            </Link>
            <div className={styles.nominations}>
              {nominations.map(({ nominationId, nominee, comment }) => (
                <Nomination
                  title={awardsConfig[awardId].nominations[nominationId].title}
                  actorId={nominee}
                  comment={comment}
                  actors={actors}
                  key={nominationId}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </DataArea>
  );
};

export { Awards };
