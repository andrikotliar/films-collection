import { Link, LinkProps } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './add-item-link.module.css';
import { FC, PropsWithChildren } from 'react';

type AddItemLinkProps = PropsWithChildren<
  Omit<LinkProps, 'className' | 'children'>
>;

export const AddItemLink: FC<AddItemLinkProps> = ({ children, ...props }) => {
  return (
    <Link className={styles.addItemLink} {...props}>
      <PlusIcon size={18} />
      <span>{children}</span>
    </Link>
  );
};
