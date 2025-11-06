import { type PropsWithChildren } from 'react';
import { Link, type LinkProps } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './styles.module.css';

type AddItemLinkProps = Omit<LinkProps, 'className' | 'children'>;

export const AddItemLink = ({ children, ...props }: PropsWithChildren<AddItemLinkProps>) => {
  return (
    <div>
      <Link className={styles.add_item_link} {...props}>
        <PlusIcon size={18} />
        <span>{children}</span>
      </Link>
    </div>
  );
};
