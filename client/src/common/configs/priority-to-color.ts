import { Priority } from '../enums';
import { StatusColor } from '../types';

type PriorityColor = {
  [key in Priority]: StatusColor;
};

export const priorityToColor: PriorityColor = {
  [Priority.HIGH]: 'red',
  [Priority.MEDIUM]: 'yellow',
  [Priority.LOW]: 'gray',
};
