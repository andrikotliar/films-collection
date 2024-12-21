import { Priority } from '@/enums';
import { SelectOption } from '@/types';

export const prioritySelectOptions: SelectOption<number, Priority>[] = [
  {
    label: Priority.LOW,
    value: 1,
  },
  {
    label: Priority.MEDIUM,
    value: 2,
  },
  {
    label: Priority.HIGH,
    value: 3,
  },
];
