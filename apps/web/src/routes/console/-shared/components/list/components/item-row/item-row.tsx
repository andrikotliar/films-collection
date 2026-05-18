import styles from './item-row.module.css';
import { Button } from '~/shared';
import { type DefaultListItem } from '~/routes/console/-shared';
import { EyeIcon, PencilIcon, PlusSquareIcon, Trash2Icon } from 'lucide-react';

type ActionHandler<T extends DefaultListItem> = (data: T) => void;

export type AdditionalHandler<T extends DefaultListItem> = {
  id: string;
  icon: React.ReactNode;
  action: (data: T) => void;
};

export type ItemRowProps<T extends DefaultListItem> = {
  data: T;
  titleKey?: keyof T;
  description?: (data: T) => string | null;
  onView?: ActionHandler<T>;
  onCreate?: ActionHandler<T>;
  onDelete: ActionHandler<T>;
  onEdit: ActionHandler<T>;
  additionalHandlers?: Array<AdditionalHandler<T>>;
  viewActionAvailable?: (item: T) => boolean;
};

const defaultViewActionAvailableFn = <T extends DefaultListItem>(_item: T) => {
  return true;
};

export const ItemRow = <T extends DefaultListItem>({
  data,
  titleKey = 'title',
  description,
  onDelete,
  onEdit,
  onCreate,
  onView,
  additionalHandlers,
  viewActionAvailable = defaultViewActionAvailableFn,
}: ItemRowProps<T>) => {
  return (
    <div className={styles.item_row}>
      <div className={styles.item_row_content}>
        <div>{data[titleKey]}</div>
        <div className={styles.right_column}>
          {typeof onView === 'function' && viewActionAvailable(data) && (
            <Button onClick={() => onView(data)} variant="ghost" icon={<EyeIcon />} />
          )}
          {typeof onCreate === 'function' && (
            <Button onClick={() => onCreate(data)} variant="ghost" icon={<PlusSquareIcon />} />
          )}
          <Button onClick={() => onEdit(data)} variant="ghost" icon={<PencilIcon />} />
          {additionalHandlers?.map((handler) => (
            <Button
              key={handler.id}
              onClick={() => handler.action(data)}
              variant="ghost"
              icon={handler.icon}
            />
          ))}
          <Button onClick={() => onDelete(data)} variant="ghost" icon={<Trash2Icon />} />
        </div>
      </div>
      {typeof description === 'function' && (
        <div className={styles.description}>{description(data)}</div>
      )}
    </div>
  );
};
