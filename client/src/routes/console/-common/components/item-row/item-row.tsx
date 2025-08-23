import styles from './styles.module.css';
import { Button, IconLink, PriorityBadge } from '@/components';
import { type DefaultListItem } from '@/routes/console/-common';
import { type LinkProps } from '@tanstack/react-router';
import { PencilIcon, PlusSquareIcon, Trash2Icon } from 'lucide-react';

type ActionHandler<T extends DefaultListItem> = (data: T) => void;

export type ItemRowProps<T extends DefaultListItem> = {
  data: T;
  titleKey?: keyof T;
  description?: (data: T) => string;
  link?: Pick<LinkProps, 'to' | 'params'>;
  onDelete: ActionHandler<T>;
  onEdit: ActionHandler<T>;
};

export const ItemRow = <T extends DefaultListItem>({
  data,
  titleKey = 'title',
  description,
  onDelete,
  onEdit,
  link,
}: ItemRowProps<T>) => {
  return (
    <div className={styles.row}>
      {data.priority && <PriorityBadge value={data.priority} />}
      <div>{data[titleKey]}</div>
      {typeof description === 'function' && <div>{description(data)}</div>}
      <div className={styles.tools}>
        {link && <IconLink to={link.to} params={link.params} icon={<PlusSquareIcon />} />}
        <Button onClick={() => onEdit(data)} variant="ghost" icon={<PencilIcon />} />
        <Button onClick={() => onDelete(data)} variant="ghost" icon={<Trash2Icon />} />
      </div>
    </div>
  );
};
