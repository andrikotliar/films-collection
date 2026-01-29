import { Link, type LinkProps } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './add-item-link.module.css';

type AddItemLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  children?: React.ReactNode;
};

export const AddItemLink = ({ children, ...props }: AddItemLinkProps) => {
  return (
    <Link className={styles.add_item_link} {...props}>
      <PlusIcon size={18} />
      <span>{children}</span>
    </Link>
  );
};
