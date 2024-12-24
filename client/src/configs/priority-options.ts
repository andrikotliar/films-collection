import { Priority } from '@/enums';
import { ConfigOption } from '@/types';
import { priorityToColor } from './priority-to-color';

export const priorityOptions: ConfigOption<number, Priority>[] = [
  {
    label: Priority.LOW,
    value: 1,
    color: priorityToColor[Priority.LOW],
  },
  {
    label: Priority.MEDIUM,
    value: 2,
    color: priorityToColor[Priority.MEDIUM],
  },
  {
    label: Priority.HIGH,
    value: 3,
    color: priorityToColor[Priority.HIGH],
  },
];
