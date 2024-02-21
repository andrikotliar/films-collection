import { GroupHeader } from '@/pages/Main/components/Filters/components/GroupHeader';
import styles from './Group.module.css';
import { FC, PropsWithChildren } from 'react';
import { Scrollable } from '@/components';

type GroupProps = {
  title: string;
  bodyClassName?: string;
};

const Group: FC<PropsWithChildren<GroupProps>> = ({
  children,
  title,
  bodyClassName,
}) => {
  return (
    <div className={styles.group}>
      <GroupHeader>{title}</GroupHeader>
      <Scrollable className={bodyClassName}>{children}</Scrollable>
    </div>
  );
};

export { Group };
