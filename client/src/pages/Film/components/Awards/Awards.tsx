import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FilmAward } from '@/types';
import { buildMediaPath, buildQueryLink } from '@/helpers';
import { DataArea, DataGrid, Image, ScrollableWrapper } from '@/components';
import { Nomination } from './components';
import styles from './Awards.module.css';

type AwardsProps = {
  awards: FilmAward[];
};

const Awards: FC<AwardsProps> = ({ awards }) => {
  const sortedAwards = useMemo(() => {
    return awards.sort((a, b) => b.nominations.length - a.nominations.length);
  }, [awards]);

  return (
    <DataGrid>
      {sortedAwards.map(({ award, nominations }) => (
        <DataArea className={styles.award} key={award._id}>
          <div className={styles.header}>
            <Image
              src={buildMediaPath('awards', award.image)}
              alt={award.title}
              className={styles.awardImage}
            />
            <div className={styles.main}>
              <h3 className={styles.title}>
                <Link to={buildQueryLink({ awards: award._id })}>
                  {award.title}
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
