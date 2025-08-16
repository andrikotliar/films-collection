import { Panel } from '@/components';
import { ItemRow, type ItemRowProps } from '../item-row/item-row';
import { type DefaultListItem } from '@/routes/console/-types/default-list-item';
import styles from './styles.module.css';
import { FileX2Icon } from 'lucide-react';

type ListProps<T extends DefaultListItem> = {
  items: T[];
} & Omit<ItemRowProps<T>, 'data'>;

export const List = <T extends DefaultListItem>({ items, ...props }: ListProps<T>) => {
  if (!items.length) {
    return (
      <div className={styles.emptyState}>
        <FileX2Icon />
        <span>List is empty</span>
      </div>
    );
  }

  return (
    <Panel hasPaddings={false}>
      {items.map((item) => (
        <ItemRow key={item.id} data={item} {...props} />
      ))}
    </Panel>
  );
};
