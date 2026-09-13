import { getExternalImageUrl, Image, type api, type ApiResponse } from '~/shared';
import styles from './hobby-items-grid.module.css';

type HobbyItemsGridProps = {
  items: ApiResponse<typeof api.hobbies.getHobby>['items'];
};

export const HobbyItemsGrid = ({ items }: HobbyItemsGridProps) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.image_wrapper}>
            <Image src={getExternalImageUrl(item.imageUrl)} />
          </div>
          <div className={styles.data}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.authors}>
              {item.authors.map((author) => author.name).join(', ')}
            </div>
            <div className={styles.release_year}>Released: {item.releaseYear}</div>
            <div className={styles.description}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
