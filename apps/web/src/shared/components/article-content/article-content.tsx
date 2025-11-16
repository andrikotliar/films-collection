import styles from './styles.module.css';
import clsx from 'clsx';
import { type ComponentProps } from 'react';

type ArticleContentProps = ComponentProps<'article'>;

export const ArticleContent = ({ children, className, ...props }: ArticleContentProps) => {
  return (
    <article className={clsx(styles.content, className)} {...props}>
      {children}
    </article>
  );
};
