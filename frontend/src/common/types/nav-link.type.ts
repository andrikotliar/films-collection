import { ReactNode } from 'react';

type NavLink = {
  id: string;
  title: string;
  link: string;
  icon?: ReactNode;
};

export type { NavLink };
