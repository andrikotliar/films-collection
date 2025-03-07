import { FC, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { FilmAward } from '@/types';
import { Image } from '@/ui';
import { Nomination } from './components';
import styles from './Awards.module.css';
import classNames from 'classnames';

type AwardsProps = {
  awards: FilmAward[];
};

export const Awards: FC<AwardsProps> = ({ awards }) => {
  const sortedAwards = useMemo(() => {
    return awards.sort((a, b) => b.nominations.length - a.nominations.length);
  }, [awards]);

  return (
    <div>
      {sortedAwards.map(({ award, nominations }) => (
        <div key={award.id} className={styles.row}>
          <div className={classNames(styles.cell, styles.awardCell)}>
            <div className={styles.header}>
              <Image
                src={award.image}
                alt={award.title}
                className={styles.awardImage}
                isExternal
              />
              <div className={styles.main}>
                <h3 className={styles.title}>
                  <Link to="/" search={{ awardId: String(award.id) }}>
                    {award.title}
                  </Link>
                </h3>
                <p>
                  {nominations.length} nomination
                  {nominations.length > 1 && 's'}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(styles.cell, styles.nominations)}>
            {nominations.map(({ title, person, comment }, index) => (
              <Nomination
                title={title}
                key={index}
                nominee={person}
                comment={comment}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
