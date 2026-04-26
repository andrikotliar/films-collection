import { Link } from '@tanstack/react-router';
import { Image } from '~/shared';
import mainPageBanner from '~/assets/banners/main_page_banner.webp';
import styles from './films-banner.module.css';
import { ArrowRightIcon } from 'lucide-react';

type FilmsBannerProps = {
  count: number;
};

export const FilmsBanner = ({ count }: FilmsBannerProps) => {
  return (
    <div>
      <Link to="/films" className={styles.films_banner}>
        <Image src={mainPageBanner} />
        <div className={styles.text}>
          <div className={styles.title}>
            All films <ArrowRightIcon />
          </div>
          <div className={styles.count}>{count} titles</div>
        </div>
      </Link>
    </div>
  );
};
