import { Link, type LinkProps } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './styles.module.css';
import { type ReactNode } from 'react';

type AddItemLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  children?: ReactNode;
};

export const AddItemLink = ({ children, ...props }: AddItemLinkProps) => {
  return (
    <div>
      <Link className={styles.add_item_link} {...props}>
        <PlusIcon size={18} />
        <span>{children}</span>
      </Link>
    </div>
  );
};
