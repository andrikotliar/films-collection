import { Link } from '@tanstack/react-router';
import { getFilmsCountQueryOptions, Image } from '~/shared';
import mainPageBanner from '~/assets/banners/main_page_banner.webp';
import styles from './films-banner.module.css';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';

export const FilmsBanner = () => {
  const { data } = useQuery(getFilmsCountQueryOptions());

  return (
    <Link to="/films" className={styles.wrapper}>
      <Image src={mainPageBanner} />
      <div className={styles.text}>
        <div className={styles.title}>
          All films <ArrowRightIcon />
        </div>
        {data?.count !== undefined && <div className={styles.count}>{data.count} titles</div>}
      </div>
    </Link>
  );
};
