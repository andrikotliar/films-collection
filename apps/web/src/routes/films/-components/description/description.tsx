import styles from './styles.module.css';
import sanitizeHtml from 'sanitize-html';
import { ALLOWED_HTML_TAGS } from '~/shared';

type Props = {
  rawHtml: string;
};

export const Description = ({ rawHtml }: Props) => {
  const content = sanitizeHtml(rawHtml, {
    allowedTags: ALLOWED_HTML_TAGS,
  });

  return <div className={styles.description} dangerouslySetInnerHTML={{ __html: content }} />;
};
