import classes from './BubbleLink.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { buildLink } from '@/helpers';
import { BubbleLinkType } from '@/common';

type Props = BubbleLinkType & {
  className?: string;
};

const BubbleLink: FC<Props> = ({
  property,
  value,
  suffix,
  color = 'main',
  className,
}) => {
  return (
    <Link
      to={buildLink(property, value)}
      className={classNames(classes.dataLink, classes[color], className)}
    >
      {value} {suffix}
    </Link>
  );
};

export { BubbleLink };
