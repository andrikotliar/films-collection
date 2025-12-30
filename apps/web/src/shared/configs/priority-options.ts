import type { ListOption } from '@films-collection/shared';
import { priorityToColor } from '~/shared/configs/priority-to-color';
import { Priority } from '~/shared/enums';

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
