import { FC } from 'react';
import styles from './Description.module.css';
import sanitizeHtml from 'sanitize-html';

type DescriptionProps = {
  rawHtml: string;
};

const ALLOWED_DESCRIPTION_TAGS = [
  'div',
  'p',
  'b',
  'strong',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'i',
  'ul',
  'ol',
  'i',
];

export const Description: FC<DescriptionProps> = ({ rawHtml }) => {
  const content = sanitizeHtml(rawHtml, {
    allowedTags: ALLOWED_DESCRIPTION_TAGS,
  });

  return (
    <div
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
