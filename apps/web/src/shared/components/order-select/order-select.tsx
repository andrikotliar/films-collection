import { FieldLabel } from '~/shared/components/field-label/field-label';
import styles from './order-select.module.css';
import { ScrollableLine } from '~/shared/components/scrollable-line/scrollable-line';
import { getVirtualChapterValue } from '~/shared/components/order-select/helpers';
import { Image } from '~/shared/components/image/image';
import clsx from 'clsx';

type ListItem = {
  id: number;
  chapterOrder: number | null;
  poster: string | null;
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
  const startingVirtualChapter = getVirtualChapterValue(0, list[0]?.chapterOrder);

  return (
    <div className={styles.films}>
      <FieldLabel>{label}</FieldLabel>
      <ScrollableLine>
        {list.length === 0 && (
          <label className={clsx(styles.film, styles.position_select)}>
            <input
              type="radio"
              onChange={() => onChange(startingVirtualChapter)}
              checked={value === startingVirtualChapter}
            />
          </label>
        )}
        {list.map((film, index) => {
          const virtualChapter = getVirtualChapterValue(
            film.chapterOrder,
            list[index + 1]?.chapterOrder,
          );

          const isNextChapterSelected = list[index + 1]?.chapterOrder === value;
          const isFirstChapterSelected = list[0].id === currentId;
          const isCurrentFilmSelected = film.id === currentId;

          return (
            <div key={film.id} className={styles.chapter_section}>
              {index === 0 && !isFirstChapterSelected && (
                <label className={clsx(styles.film, styles.position_select)}>
                  <input
                    type="radio"
                    onChange={() => onChange(startingVirtualChapter)}
                    checked={startingVirtualChapter === value}
                  />
                  <span className={styles.chapter_number}>{index + 1}</span>
                </label>
              )}
              {isCurrentFilmSelected ? (
                <label className={clsx(styles.film, styles.position_select)}>
                  <input
                    type="radio"
                    onChange={() => onChange(film.chapterOrder ?? 0)}
                    checked={film.chapterOrder === value}
                  />
                  <span className={styles.chapter_number}>{film.chapterOrder}</span>
                </label>
              ) : (
                <div className={styles.film}>
                  <Image src={film.poster} className={styles.poster_select_image} />
                </div>
              )}
              {!isCurrentFilmSelected && !isNextChapterSelected && (
                <label className={clsx(styles.film, styles.position_select)}>
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
