import classNames from 'classnames';
import styles from './chapter-button.module.css';
import { ReactNode } from 'react';

export type ChapterButtonProps = {
  selectedChapter: number | null;
  chapterOrder: number;
  onSelect: (chapterNumber: number) => void;
  children?: ReactNode;
};

export const ChapterButton = ({
  chapterOrder,
  onSelect,
  children,
  selectedChapter,
}: ChapterButtonProps) => {
  const currentNumber = chapterOrder ?? 0;

  const checkIsActive = () => {
    if (!selectedChapter) {
      return false;
    }

    return selectedChapter - 1 === chapterOrder;
  };

  const isActive = checkIsActive();

  return (
    <button
      className={classNames(styles.button, {
        [styles.active]: isActive,
      })}
      onClick={() => onSelect(currentNumber + 1)}
      disabled={isActive}
    >
      {children}
    </button>
  );
};
