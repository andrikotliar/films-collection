import { FC } from 'react';
import styles from './description.module.css';
import sanitizeHtml from 'sanitize-html';
import { ALLOWED_HTML_TAGS } from '@/constants';

type DescriptionProps = {
  rawHtml: string;
};

export const Description: FC<DescriptionProps> = ({ rawHtml }) => {
  const content = sanitizeHtml(rawHtml, {
    allowedTags: ALLOWED_HTML_TAGS,
  });

  return (
    <div
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
