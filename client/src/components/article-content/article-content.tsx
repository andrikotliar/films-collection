import styles from './article-content.module.css';
import classNames from 'classnames';
import { ComponentProps, FC, PropsWithChildren } from 'react';

type ArticleContentProps = ComponentProps<'article'>;

export const ArticleContent: FC<PropsWithChildren<ArticleContentProps>> = ({
  children,
  className,
}) => {
  return (
    <article className={classNames(styles.content, className)}>
      {children}
    </article>
  );
};
