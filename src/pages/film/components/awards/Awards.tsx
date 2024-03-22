import { FC } from 'react';
import { Link } from 'react-router-dom';
import { awardIcons } from '@/configs';
import { Award } from '@/common/types';
import { buildLink } from '@/helpers';
import { DataArea, DataGrid, Scrollable } from '@/components';

import styles from './Awards.module.css';

type Props = {
  awards: Award[];
};

const Awards: FC<Props> = ({ awards }) => {
  const awardImage = (awardTitle: keyof typeof awardIcons) => {
    return `/images/awards/${awardIcons[awardTitle]}`;
  };

  return (
    <DataGrid>
      {awards.map((award) => (
        <DataArea className={styles.award} key={award.title}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <img
                src={awardImage(award.title as keyof typeof awardIcons)}
                alt=""
              />
            </div>
            <div className={styles.main}>
              <h3 className={styles.title}>
                <Link to={buildLink('awards', award.title)}>{award.title}</Link>
              </h3>
              <p>
                {award.nominations.length} nomination
                {award.nominations.length > 1 && 's'}
              </p>
            </div>
          </div>
          <Scrollable className={styles.nominations}>
            {award.nominations.map((nomination) => (
              <p key={nomination}>{nomination}</p>
            ))}
          </Scrollable>
        </DataArea>
      ))}
    </DataGrid>
  );
};

export { Awards };
