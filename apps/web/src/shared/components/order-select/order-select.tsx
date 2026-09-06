import { FieldLabel } from '~/shared/components/field-label/field-label';
import styles from './order-select.module.css';
import { ScrollableLine } from '~/shared/components/scrollable-line/scrollable-line';
import { getVirtualChapterValue } from '~/shared/components/order-select/helpers';
import { Image } from '~/shared/components/image/image';
import clsx from 'clsx';
import { getExternalImageUrl } from '~/shared/helpers';

type ListItem = {
  id: number;
  order: number | null;
  imageUrl: string | null;
};

export type OrderSelectProps = {
  label?: string;
  list: ListItem[];
  value: number;
  currentId?: number;
  onChange: (value?: number) => void;
};

export const OrderSelect = ({
  label = 'Select position',
  list,
  value,
  currentId,
  onChange,
}: OrderSelectProps) => {
  const startingVirtualChapter = getVirtualChapterValue(0, list[0]?.order);

  return (
    <div className={styles.wrapper}>
      <FieldLabel>{label}</FieldLabel>
      <ScrollableLine>
        {list.length === 0 && (
          <label className={clsx(styles.item, styles.position_select)}>
            <input
              type="radio"
              onChange={() => onChange(startingVirtualChapter)}
              checked={value === startingVirtualChapter}
            />
          </label>
        )}
        {list.map((item, index) => {
          const virtualChapter = getVirtualChapterValue(item.order, list[index + 1]?.order);

          const isNextChapterSelected = list[index + 1]?.order === value;
          const isFirstChapterSelected = list[0].id === currentId;
          const isCurrentFilmSelected = item.id === currentId;

          return (
            <div key={item.id} className={styles.chapter_section}>
              {index === 0 && !isFirstChapterSelected && (
                <label className={clsx(styles.item, styles.position_select)}>
                  <input
                    type="radio"
                    onChange={() => onChange(startingVirtualChapter)}
                    checked={startingVirtualChapter === value}
                  />
                  <span className={styles.chapter_number}>{index + 1}</span>
                </label>
              )}
              {isCurrentFilmSelected ? (
                <label className={clsx(styles.item, styles.position_select)}>
                  <input
                    type="radio"
                    onChange={() => onChange(item.order ?? 0)}
                    checked={item.order === value}
                  />
                  <span className={styles.chapter_number}>{item.order}</span>
                </label>
              ) : (
                <div className={styles.item}>
                  <Image
                    src={getExternalImageUrl(item.imageUrl)}
                    className={styles.poster_select_image}
                  />
                </div>
              )}
              {!isCurrentFilmSelected && !isNextChapterSelected && (
                <label className={clsx(styles.item, styles.position_select)}>
                  <input
                    type="radio"
                    onChange={() => onChange(virtualChapter)}
                    checked={virtualChapter === value}
                  />
                  <span className={styles.chapter_number}>{index + 2}</span>
                </label>
              )}
            </div>
          );
        })}
      </ScrollableLine>
    </div>
  );
};
