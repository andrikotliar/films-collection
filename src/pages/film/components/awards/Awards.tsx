import { FC } from 'react';
import { Link } from 'react-router-dom';
import { awardsConfig } from '@/configs';
import { Award } from '@/common/types';
import { useDataContext } from '@/context';
import { buildQueryLink } from '@/helpers';
import { Nomination } from './components';
import { DataArea, Icons } from '@/components';
import styles from './Awards.module.css';

type Props = {
  awards: Award[];
};

const Awards: FC<Props> = ({ awards }) => {
  const { actors } = useDataContext();

  return (
    <DataArea className={styles.wrapper}>
      {awards.map(({ awardId, nominations }) => (
        <div key={awardId} className={styles.award}>
          <Link to={buildQueryLink('awards', awardId)}>
            <Icons icon={awardsConfig[awardId].icon} size={100} />
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
                  title={awardsConfig[awardId].nominations[nominationId]}
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
