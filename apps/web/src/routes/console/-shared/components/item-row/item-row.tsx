import styles from "./item-row.module.css";
import { Button, PriorityBadge } from '~/shared';
import { type DefaultListItem } from '~/routes/console/-shared';
import { EyeIcon, PencilIcon, PlusSquareIcon, Trash2Icon } from 'lucide-react';

type ActionHandler<T extends DefaultListItem> = (data: T) => void;

export type ItemRowProps<T extends DefaultListItem> = {
  data: T;
  titleKey?: keyof T;
  description?: (data: T) => string;
  onView?: ActionHandler<T>;
  onCreate?: ActionHandler<T>;
  onDelete: ActionHandler<T>;
  onEdit: ActionHandler<T>;
};

export const ItemRow = <T extends DefaultListItem>({
  data,
  titleKey = 'title',
  description,
  onDelete,
  onEdit,
  onCreate,
  onView,
}: ItemRowProps<T>) => {
  return (
    <div className={styles.item_row}>
      <div className={styles.item_row_content}>
        <div className={styles.left_column}>
          {data.priority && <PriorityBadge value={data.priority} />}
          <div>{data[titleKey]}</div>
        </div>
        <div className={styles.right_column}>
          {typeof onView === 'function' && (
            <Button onClick={() => onView(data)} variant="ghost" icon={<EyeIcon />} />
          )}
          {typeof onCreate === 'function' && (
            <Button onClick={() => onCreate(data)} variant="ghost" icon={<PlusSquareIcon />} />
          )}
          <Button onClick={() => onEdit(data)} variant="ghost" icon={<PencilIcon />} />
          <Button onClick={() => onDelete(data)} variant="ghost" icon={<Trash2Icon />} />
        </div>
      </div>
      {typeof description === 'function' && (
        <div className={styles.description}>{description(data)}</div>
      )}
    </div>
  );
};
