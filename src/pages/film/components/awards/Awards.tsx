import { FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { awardsConfig } from '@/configs';
import { Award } from '@/common/types';
import { FilmsContext } from '@/context';
import { buildQueryLink } from '@/helpers';
import { DataArea, DataGrid, Icons, Scrollable } from '@/components';
import { Nomination } from './components';
import styles from './Awards.module.css';

type AwardsProps = {
  awards: Award[];
};

const Awards: FC<AwardsProps> = ({ awards }) => {
  const { actors } = useContext(FilmsContext);

  const sortedAwards = useMemo(() => {
    return awards.sort((a, b) => b.nominations.length - a.nominations.length);
  }, [awards]);

  return (
    <DataGrid>
      {sortedAwards.map(({ awardId, nominations }) => (
        <DataArea className={styles.award} key={awardId}>
          <div className={styles.header}>
            <Icons icon={awardsConfig[awardId].icon} size={60} />
            <div className={styles.main}>
              <h3 className={styles.title}>
                <Link to={buildQueryLink('awards', awardId)}>
                  {awardsConfig[awardId].title}
                </Link>
              </h3>
              <p>
                {nominations.length} nomination{nominations.length > 1 && 's'}
              </p>
            </div>
          </div>
          <Scrollable className={styles.nominations}>
            {nominations.map(({ nominationId, actorId, comment }) => (
              <Nomination
                title={awardsConfig[awardId].nominations[nominationId]}
                key={nominationId}
                nominee={
                  actorId && actors
                    ? { id: actorId, name: actors[actorId].name }
                    : null
                }
                comment={comment}
              />
            ))}
          </Scrollable>
        </DataArea>
      ))}
    </DataGrid>
  );
};

export { Awards };
