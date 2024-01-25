import { ReactNode } from 'react';

type NavLink = {
  id: string;
  title: string;
  link: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  isPrivate?: boolean;
};

export type { NavLink };
