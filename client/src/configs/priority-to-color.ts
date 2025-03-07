import { Priority } from '@/enums';

export const priorityToColor = {
  [Priority.HIGH]: 'red',
  [Priority.MEDIUM]: 'yellow',
  [Priority.LOW]: 'gray',
};
