import { SkeletonBlock } from '~/shared/components/skeleton-block/skeleton-block';
import styles from './page-skeleton.module.css';
import type { SummaryConfig } from '~/routes/films/$id/-helpers';
import {
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  GlobeIcon,
  HandCoinsIcon,
  WalletIcon,
} from 'lucide-react';
import { SummaryBlock } from '~/routes/films/$id/-components/summary-section/components/summary-block/summary-block';
import { FilmPageLayout } from '~/routes/films/$id/-components/film-page-layout/film-page-layout';
import { NavigationRow } from '~/routes/films/$id/-components/navigation-row/navigation-row';
import { PersonRole } from '@films-collection/shared';
import { RoleTitle } from '~/routes/films/$id/-components/cast-and-crew/components/role-title/role-title';

const skeletonSummaryConfig: SummaryConfig[] = [
  {
    id: 'genres',
    title: 'Genres',
    content: <SkeletonBlock width="100%" height="41px" />,
    icon: <BookIcon />,
  },
  {
    id: 'releaseDate',
    title: 'Release Date',
    icon: <CalendarIcon />,
    content: <SkeletonBlock width="100%" height="41px" />,
  },
  {
    id: 'duration',
    title: 'Runtime',
    icon: <ClockIcon />,
    content: <SkeletonBlock width="100%" height="41px" />,
  },
  {
    id: 'countries',
    title: 'Origin countries',
    icon: <GlobeIcon />,
    content: <SkeletonBlock width="100%" height="41px" />,
  },
  {
    id: 'studios',
    title: 'Production studios',
    icon: <BuildingIcon />,
    content: <SkeletonBlock width="100%" height="41px" />,
  },
  {
    id: 'budget',
    title: 'Budget',
    icon: <WalletIcon />,
    content: <SkeletonBlock width="100%" height="41px" />,
  },
  {
    id: 'boxOffice',
    title: 'Box Office',
    icon: <HandCoinsIcon />,
    content: <SkeletonBlock width="100%" height="41px" />,
  },
  {
    id: 'synopsis',
    title: 'Synopsis',
    icon: <FileTextIcon />,
    content: <SkeletonBlock width="100%" height="60px" />,
  },
];

export const PageSkeleton = () => {
  return (
    <FilmPageLayout>
      <NavigationRow />
      <div className={styles.top_section}>
        <div className={styles.title_row}>
          <SkeletonBlock width="40%" height="45px" />
          <SkeletonBlock width="94px" height="28px" />
        </div>
        <div className={styles.content}>
          <div className={styles.left_column}>
            <div className={styles.poster}>
              <SkeletonBlock width="100%" height="100%" />
            </div>
            <div className={styles.trailer}>
              <SkeletonBlock width="100%" height="40px" />
            </div>
          </div>
          <div className={styles.right_column}>
            {skeletonSummaryConfig.map((item) => (
              <SummaryBlock label={item.title} icon={item.icon} key={item.id} hasPadding={false}>
                {item.content}
              </SummaryBlock>
            ))}
            <div className={styles.row}>
              <SkeletonBlock width="80px" height="28px" />
              <SkeletonBlock width="80px" height="28px" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom_section}>
        {Object.values(PersonRole).map((role) => (
          <div className={styles.role_item} key={role}>
            <RoleTitle role={role} />
            <SkeletonBlock width="100%" height={role === 'ACTOR' ? '340px' : '20px'} />
          </div>
        ))}
      </div>
    </FilmPageLayout>
  );
};
