import classes from './DataLink.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { buildLink } from '@/helpers';

type DataLinkType = {
  property: string;
  value: string | number | string[];
  suffix?: string;
  color?: 'primary' | 'secondary' | 'extra';
};

const DataLink: FC<DataLinkType> = ({
  property,
  value,
  suffix,
  color = 'main',
}) => {
  return (
    <Link
      to={buildLink(property, value)}
      className={classNames(
        classes.dataLink,
        classes[color],
      )}
    >
      {value} {suffix}
    </Link>
  );
};

export { DataLink };
export type { DataLinkType };
