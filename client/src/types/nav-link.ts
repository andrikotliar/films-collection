import { ReactNode } from 'react';

export type NavLink = {
  id: string;
  title: string;
  link: string;
  icon?: ReactNode;
};
