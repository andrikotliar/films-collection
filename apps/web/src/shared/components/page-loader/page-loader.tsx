import { mainLogoSvg } from '~/assets';
import { Image } from '~/shared/components/image/image';
import styles from './page-loader.module.css';

export const PageLoader = () => {
  return (
    <div className={styles.page_loader}>
      <Image src={mainLogoSvg} shouldFitContainer className={styles.loader_logo} />
    </div>
  );
};
