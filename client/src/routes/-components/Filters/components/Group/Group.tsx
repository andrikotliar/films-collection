import styles from './Group.module.css';
import { FC, PropsWithChildren } from 'react';
import { GroupHeader } from '../GroupHeader/GroupHeader';

type GroupProps = {
  title: string;
  bodyClassName?: string;
};

export const Group: FC<PropsWithChildren<GroupProps>> = ({
  children,
  title,
}) => {
  return (
    <div className={styles.group}>
      <GroupHeader>{title}</GroupHeader>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
