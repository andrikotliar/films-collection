import { priorityTitles, priorityToColor, type Priority } from '@/common';
import styles from './styles.module.css';
import { Status } from '@/components/status/status';

type PriorityBadgeProps = {
  value: Priority;
};

export const PriorityBadge = ({ value }: PriorityBadgeProps) => {
  const title = priorityTitles[value];
  const color = priorityToColor[value];

  return (
    <div className={styles.priorityWrapper}>
      <Status color={color} title={title} />
    </div>
  );
};
