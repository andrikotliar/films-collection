import { Priority, priorityTitles, priorityToColor } from '~/shared';
import styles from './priority-badge.module.css';
import { Status } from '~/shared/components/status/status';

type PriorityBadgeProps = {
  value: number;
};

const priorityOrder = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

export const PriorityBadge = ({ value }: PriorityBadgeProps) => {
  const priority = priorityOrder[value - 1];
  const title = priorityTitles[priority];
  const color = priorityToColor[priority];

  return (
    <div className={styles.priority_wrapper}>
      <Status color={color} title={title} />
    </div>
  );
};
