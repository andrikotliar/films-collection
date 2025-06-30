import { Panel } from '@/components';
import { ItemRow, ItemRowProps } from '../item-row/item-row';
import { DefaultListItem } from '@/routes/console/-types/default-list-item';

type ListProps<T extends DefaultListItem> = {
  items: T[];
} & Omit<ItemRowProps<T>, 'data'>;

export const List = <T extends DefaultListItem>({
  items,
  ...props
}: ListProps<T>) => {
  return (
    <Panel hasPaddings={false}>
      {items.map((item) => (
        <ItemRow key={item.id} data={item} {...props} />
      ))}
    </Panel>
  );
};
