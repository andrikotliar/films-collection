import styles from './post-row.module.css';
import { PostsListItem } from '@/common';
import { Button, IconLink } from '@/components';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import sanitize from 'sanitize-html';

type PostRowProps = {
  data: PostsListItem;
  onDelete: (data: PostsListItem) => void;
};

export const PostRow = ({ data, onDelete }: PostRowProps) => {
  const sanitizedText = sanitize(data.shortContent, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return (
    <div className={styles.row}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.tools}>
          <IconLink
            to="/console/posts/$id"
            params={{ id: data.id.toString() }}
            icon={<PencilIcon size={20} />}
          />
          <Button
            icon={<Trash2Icon />}
            variant="ghost"
            onClick={() => onDelete(data)}
          />
        </div>
      </div>
      <div className={styles.content}>{sanitizedText}</div>
    </div>
  );
};
