import classes from './Awards.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { awardIcons } from '@/configs';
import { Award } from '@/common';
import { buildLink } from '@/helpers';
import classNames from 'classnames';

const Awards: FC<{ awards: Award[] }> = ({ awards }) => {
  const awardImage = (
    awardTitle: keyof typeof awardIcons,
  ) => {
    return `/images/awards/${awardIcons[awardTitle]}`;
  };

  return (
    <div className={classes.awards}>
      {awards.map(award => (
        <div className={classes.award} key={award.title}>
          <div className={classes.header}>
            <div className={classes.icon}>
              <img
                src={awardImage(
                  award.title as keyof typeof awardIcons,
                )}
                alt=""
              />
            </div>
            <div className={classes.main}>
              <h3 className={classes.title}>
                <Link to={buildLink('awards', award.title)}>
                  {award.title}
                </Link>
              </h3>
              <p>
                {award.nominations.length} nomination
                {award.nominations.length > 1 && 's'}
              </p>
            </div>
          </div>
          <ul
            className={classNames(
              classes.nominations,
              'custom-scroll',
            )}
          >
            {award.nominations.map(nomination => (
              <li key={nomination}>{nomination}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export { Awards };
