import styles from './BlockLink.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { buildLink } from '@/helpers';
import { BlockLinkType } from '@/common';

type Props = BlockLinkType & {
  className?: string;
};

const BlockLink: FC<Props> = ({
  property,
  value,
  suffix,
  variant = 'clouds',
  className,
}) => {
  return (
    <Link
      to={buildLink(property, value)}
      className={classNames(styles.base, classes[variant], className)}
    >
      {value} {suffix}
    </Link>
  );
};

export { BlockLink };
