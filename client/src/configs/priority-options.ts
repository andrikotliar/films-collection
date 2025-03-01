import { Priority } from '@/enums';
import { ListOption } from '@/types';
import { priorityToColor } from './priority-to-color';

export const priorityOptions: ListOption<number>[] = [
  {
    label: 'Low',
    value: 1,
    color: priorityToColor[Priority.LOW],
  },
  {
    label: 'Medium',
    value: 2,
    color: priorityToColor[Priority.MEDIUM],
  },
  {
    label: 'High',
    value: 3,
    color: priorityToColor[Priority.HIGH],
  },
];
