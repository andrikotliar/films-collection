import styles from './chapters.module.css';
import { fetchRelatedChaptersQuery } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { ChapterButton } from '../chapter-button/chapter-button';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/routes/console/manage_/-types';
import { Image } from '@/components';

type ChaptersProps = {
  chapterKey: string;
  isEnabled: boolean;
  filmId: number | null;
};

export const Chapters = ({ chapterKey, filmId, isEnabled }: ChaptersProps) => {
  const { setValue, watch } = useFormContext<FormValues>();

  const { data = [] } = useQuery(
    fetchRelatedChaptersQuery({ key: chapterKey, filmId }, isEnabled),
  );

  const handleSetValue = (chapterOrder: number) => {
    setValue('chapterOrder', chapterOrder);
  };

  const selectedChapterOrder = watch('chapterOrder');

  return (
    <div className={styles.chapters}>
      <ChapterButton
        onSelect={handleSetValue}
        selectedChapter={selectedChapterOrder}
        chapterOrder={0}
      >
        <div className={styles.empty} />
      </ChapterButton>
      {data.map((chapter) => (
        <ChapterButton
          key={chapter.id}
          onSelect={handleSetValue}
          selectedChapter={selectedChapterOrder}
          chapterOrder={chapter.chapterOrder}
        >
          <Image src={chapter.poster} isExternal className={styles.poster} />
        </ChapterButton>
      ))}
    </div>
  );
};
