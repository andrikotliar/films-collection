import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { FilmAward } from '@/types';
import { Image } from '@/components';
import { Nomination } from './components';
import styles from './Awards.module.css';
import classNames from 'classnames';

type AwardsProps = {
  awards: FilmAward[];
};

export const Awards: FC<AwardsProps> = ({ awards }) => {
  return (
    <div className={styles.wrapper}>
      {awards.map(({ award, nominations }) => (
        <div key={award.id} className={styles.row}>
          <div>
            <div className={styles.award}>
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
