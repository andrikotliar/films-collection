import { Button, PriorityBadge } from '~/components';
import { type DefaultListItem } from '~/routes/console/-common';
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
    <div className="border-b border-b-slate-300 p-3.5 justify-between last:border-0 hover:bg-slate-50 transition">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-4">
          {data.priority && <PriorityBadge value={data.priority} />}
          <div>{data[titleKey]}</div>
        </div>
        <div className="flex items-center justify-end gap-5">
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
        <div className="text-xs text-gray-600 mt-1">{description(data)}</div>
      )}
    </div>
  );
};
