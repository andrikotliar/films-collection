import classes from './DetailsGroup.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/helpers';

type DetailsGroupProps = {
  title: string;
  values: string[];
  linkParameter: string;
};

const DetailsGroup: FC<DetailsGroupProps> = ({
  title,
  values,
  linkParameter,
}) => {
  return (
    <div className={classes.detailsGroup}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.list}>
        {values.map(value => (
          <Link
            to={buildLink(linkParameter, value)}
            key={value}
            className={classes.link}
          >
            {value}
          </Link>
        ))}
      </div>
    </div>
  );
};

export { DetailsGroup };
