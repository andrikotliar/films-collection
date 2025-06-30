import { Link, LinkProps } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './add-item-link.module.css';
import { ReactNode } from 'react';

type AddItemLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  children?: ReactNode;
};

export const AddItemLink = ({ children, ...props }: AddItemLinkProps) => {
  return (
    <Link className={styles.addItemLink} {...props}>
      <PlusIcon size={18} />
      <span>{children}</span>
    </Link>
  );
};
