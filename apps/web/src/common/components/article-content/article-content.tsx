import styles from './styles.module.css';
import classNames from 'classnames';
import { ComponentProps } from 'react';

type ArticleContentProps = ComponentProps<'article'>;

export const ArticleContent = ({ children, className, ...props }: ArticleContentProps) => {
  return (
    <article className={classNames(styles.content, className)} {...props}>
      {children}
    </article>
  );
};
