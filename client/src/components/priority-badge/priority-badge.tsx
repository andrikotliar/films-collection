import { Priority, priorityTitles, priorityToColor } from '@/common';
import styles from './styles.module.css';
import { Status } from '@/components/status/status';

type PriorityBadgeProps = {
  value: number;
};

const priorityOrder = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

export const PriorityBadge = ({ value }: PriorityBadgeProps) => {
  const priority = priorityOrder[value - 1];
  const title = priorityTitles[priority];
  const color = priorityToColor[priority];

  return (
    <div className={styles.priorityWrapper}>
      <Status color={color} title={title} />
    </div>
  );
};
