import { FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AwardType } from '@/types';
import { FilmsContext } from '@/context';
import { buildQueryLink } from '@/helpers';
import { DataArea, DataGrid, Icon, Scrollable } from '@/components';
import { Nomination } from './components';
import styles from './Awards.module.css';
import { awardTitles } from '@/titles';

type AwardsProps = {
  awards: AwardType[];
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
            <Icon name={awardId} size={60} />
            <div className={styles.main}>
              <h3 className={styles.title}>
                <Link to={buildQueryLink({ awards: awardId })}>
                  {awardTitles[awardId]}
                </Link>
              </h3>
              <p>
                {nominations.length} nomination{nominations.length > 1 && 's'}
              </p>
            </div>
          </div>
          <Scrollable className={styles.nominations}>
            {nominations.map(({ title, actorId, comment }, index) => (
              <Nomination
                title={title}
                key={index}
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
