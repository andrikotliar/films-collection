import classes from './Links.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/helpers';
import { FilmData } from '@/types';
import classNames from 'classnames';

type LinksProps = {
  items: {
    value: string | number | string[];
    key: keyof FilmData;
    isAccent?: boolean;
    isSecondary?: boolean;
    suffix?: string;
  }[];
};

const Links: FC<LinksProps> = ({ items }) => {
  return (
    <div className={classes.links}>
      {items.map((item, index) =>
        Array.isArray(item.value) ? (
          <div className={classes.group} key={index}>
            {item.value.map(val => (
              <Link
                key={val}
                to={buildLink(item.key, val)}
                className={classNames(classes.link, {
                  [classes.accent]: item.isAccent,
                  [classes.secondary]: item.isSecondary,
                })}
              >
                {val} {item.suffix}
              </Link>
            ))}
          </div>
        ) : (
          <Link
            key={item.key}
            to={buildLink(item.key, item.value)}
            className={classNames(classes.link, {
              [classes.accent]: item.isAccent,
              [classes.secondary]: item.isSecondary,
            })}
          >
            {item.value} {item.suffix}
          </Link>
        ),
      )}
    </div>
  );
};

export { Links };
