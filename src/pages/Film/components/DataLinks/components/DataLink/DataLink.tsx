import classes from './DataLink.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { buildLink } from '@/helpers';
import { FilmData } from '@/common';

type DataLinkType = {
  property: keyof FilmData;
  value: string | number | string[];
  suffix?: string;
  isAccent?: boolean;
  isSecondary?: boolean;
};

const DataLink: FC<DataLinkType> = ({
  property,
  value,
  suffix,
  isAccent,
  isSecondary,
}) => {
  return (
    <Link
      to={buildLink(property, value)}
      className={classNames(classes.dataLink, {
        [classes.accent]: isAccent,
        [classes.secondary]: isSecondary,
      })}
    >
      {value} {suffix}
    </Link>
  );
};

export { DataLink };
export type { DataLinkType };
