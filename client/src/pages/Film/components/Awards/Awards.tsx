import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AwardType } from '@/types';
import { buildQueryLink } from '@/helpers';
import { DataArea, DataGrid, Icon, ScrollableWrapper } from '@/components';
import { Nomination } from './components';
import styles from './Awards.module.css';
import { awardTitles } from '@/titles';

type AwardsProps = {
  awards: AwardType[];
};

const Awards: FC<AwardsProps> = ({ awards }) => {
  const sortedAwards = useMemo(() => {
    return awards.sort((a, b) => b.nominations.length - a.nominations.length);
  }, [awards]);

  return (
    <DataGrid>
      {sortedAwards.map(({ awardKey, nominations }) => (
        <DataArea className={styles.award} key={awardKey}>
          <div className={styles.header}>
            <Icon name={awardKey} size={60} />
            <div className={styles.main}>
              <h3 className={styles.title}>
                <Link to={buildQueryLink({ awards: awardKey })}>
                  {awardTitles[awardKey]}
                </Link>
              </h3>
              <p>
                {nominations.length} nomination{nominations.length > 1 && 's'}
              </p>
            </div>
          </div>
          <ScrollableWrapper className={styles.nominations}>
            {nominations.map(({ title, actor, comment }, index) => (
              <Nomination
                title={title}
                key={index}
                nominee={actor}
                comment={comment}
              />
            ))}
          </ScrollableWrapper>
        </DataArea>
      ))}
    </DataGrid>
  );
};

export { Awards };
