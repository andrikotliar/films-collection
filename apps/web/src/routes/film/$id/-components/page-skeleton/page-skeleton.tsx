import { SkeletonBlock } from '~/shared/components/skeleton-block/skeleton-block';
import styles from './page-skeleton.module.css';
import type { SummaryConfig } from '../../-helpers';
import {
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  HandCoinsIcon,
  StarIcon,
  WalletIcon,
} from 'lucide-react';
import { SummaryBlock } from '../summary-section/components';
import { FilmPageLayout } from '../film-page-layout/film-page-layout';
import { PersonRole } from '@films-collection/shared';
import { RoleTitle } from '../cast-and-crew/components';
import { NavigationRow } from '~/routes/film/$id/-components/navigation-row/navigation-row';
import clsx from 'clsx';

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
];

export const PageSkeleton = () => {
  return (
    <FilmPageLayout>
      <NavigationRow />
      <div className={styles.top_section}>
        <div className={styles.title_row}>
          <SkeletonBlock width="60%" height="40px" />
          <div className={styles.stars}>
            <StarIcon className={styles.star_icon} />
            <StarIcon className={styles.star_icon} />
            <StarIcon className={styles.star_icon} />
          </div>
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
      <div className={clsx(styles.section, styles.description)}>
        <SkeletonBlock height="50px" />
      </div>
      <div className={styles.section}>
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
