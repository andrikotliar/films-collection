import { Link } from '@tanstack/react-router';
import { type FilmAward } from '@/common';
import { Nomination } from './components';
import styles from './awards.module.css';
import classNames from 'classnames';

type AwardsProps = {
  awards: FilmAward[];
};

export const Awards = ({ awards }: AwardsProps) => {
  return (
    <div className={styles.wrapper}>
      {awards.map(({ award, nominations }) => (
        <div key={award.id} className={styles.row}>
          <div>
            <h3 className={styles.title}>
              <Link to="/" search={{ awardId: String(award.id) }} className="font-bold">
                {award.title}
              </Link>
            </h3>
            <p>
              {nominations.length} nomination
              {nominations.length > 1 && 's'}
            </p>
          </div>
          <div className={classNames(styles.cell, styles.nominations)}>
            {nominations.map(({ title, person, comment }, index) => (
              <Nomination title={title} key={index} nominee={person} comment={comment} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
