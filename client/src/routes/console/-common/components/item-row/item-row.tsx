import styles from './styles.module.css';
import { Button, IconLink } from '@/components';
import { type DefaultListItem } from '@/routes/console/-common';
import { getTitlePlaceholder } from '@/routes/console/-common/helpers';
import type { FileRoutesByTo } from '@/routeTree.gen';
import { type LinkProps } from '@tanstack/react-router';
import { PencilIcon, PlusSquareIcon, Trash2Icon } from 'lucide-react';

type ActionHandler<T extends DefaultListItem> = (data: T) => void;

type FormLinkConfig = {
  path: keyof FileRoutesByTo;
  params: LinkProps['params'];
};

export type ItemRowProps<T extends DefaultListItem> = {
  data: T;
  description?: (data: T) => string;
  link?: FormLinkConfig;
  onDelete: ActionHandler<T>;
  onEdit: ActionHandler<T>;
};

export const ItemRow = <T extends DefaultListItem>({
  data,
  description,
  onDelete,
  onEdit,
  link,
}: ItemRowProps<T>) => {
  const title = getTitlePlaceholder(data);

  return (
    <div className={styles.row}>
      <div>{title}</div>
      {typeof description === 'function' && <div>{description(data)}</div>}
      <div className={styles.tools}>
        {link && <IconLink to={link.path} params={link.params} icon={<PlusSquareIcon />} />}
        <Button onClick={() => onEdit(data)} variant="ghost" icon={<PencilIcon />} />
        <Button onClick={() => onDelete(data)} variant="ghost" icon={<Trash2Icon />} />
      </div>
    </div>
  );
};
