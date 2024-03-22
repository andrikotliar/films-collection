import styles from './Group.module.css';
import { FC, PropsWithChildren } from 'react';
import { Scrollable } from '@/components';
import { GroupHeader } from './components';

type Props = {
  title: string;
  bodyClassName?: string;
};

const Group: FC<PropsWithChildren<Props>> = ({
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
