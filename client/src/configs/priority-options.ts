import { Priority } from '@/enums';
import { ConfigOption } from '@/types';
import { priorityColor } from './priority-to-color';

export const priorityOptions: ConfigOption<number, Priority>[] = [
  {
    label: Priority.LOW,
    value: 1,
    color: priorityColor[Priority.LOW],
  },
  {
    label: Priority.MEDIUM,
    value: 2,
    color: priorityColor[Priority.MEDIUM],
  },
  {
    label: Priority.HIGH,
    value: 3,
    color: priorityColor[Priority.HIGH],
  },
];
