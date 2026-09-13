import { getExternalImageUrl, PageTitle, Image, BackLink, getPluralWord } from '~/shared';
import styles from './hobby-title.module.css';

type HobbyTitleProps = {
  children?: React.ReactNode;
  imageUrl?: string | null;
  total: number;
};

export const HobbyTitle = ({ children, imageUrl, total = 0 }: HobbyTitleProps) => {
  return (
    <div className={styles.wrapper}>
      <BackLink path="/about">Back to about</BackLink>
      <div className={styles.row}>
        <div className={styles.image}>
          <Image src={getExternalImageUrl(imageUrl)} />
        </div>
        <div>
          <PageTitle>{children}</PageTitle>
          <div>
            {total} {getPluralWord('item', total)}
          </div>
        </div>
      </div>
    </div>
  );
};
