import styles from './ArticleContent.module.css';
import classNames from 'classnames';
import { ComponentProps, FC, PropsWithChildren } from 'react';

type ArticleContentProps = ComponentProps<'article'>;

const ArticleContent: FC<PropsWithChildren<ArticleContentProps>> = ({
  children,
  className,
}) => {
  return (
    <article className={classNames(styles.content, className)}>
      {children}
    </article>
  );
};

export { ArticleContent };
