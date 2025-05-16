import { CollectionEventFilled } from '@/types';
import { Button, Image, RouterLink } from '@/components';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import styles from './Event.module.css';
import { convertDateCode } from '@/routes/console/collection-events/-helpers';

type EventProps = {
  data: CollectionEventFilled;
  onDelete: (event: CollectionEventFilled) => void;
  onEdit: (event: CollectionEventFilled) => void;
};

export const Event: FC<EventProps> = ({ data, onDelete, onEdit }) => {
  const startDate = convertDateCode(data.startDateCode);
  const endDate = convertDateCode(data.endDateCode);

  const datesLabel =
    startDate.label === endDate.label
      ? startDate.label
      : `${startDate.label} - ${endDate.label}`;

  return (
    <div className={styles.event}>
      <div className={styles.image}>
        <Image src={data.image} isExternal />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{data.title}</h3>
        <div className={styles.dates}>{datesLabel}</div>
        <div>
          <span>Collection: </span>
          <RouterLink
            to="/"
            search={{ collectionId: String(data.collection.id) }}
          >
            {data.collection.title}
          </RouterLink>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          variant="ghost"
          icon={<PencilIcon />}
          onClick={() => onEdit(data)}
        />
        <Button
          variant="ghost"
          icon={<Trash2Icon />}
          onClick={() => onDelete(data)}
        />
      </div>
    </div>
  );
};
