import { useQuery } from '@tanstack/react-query';
import { getFilmTrailersQueryOptions, Loader, Modal } from '~/shared';
import styles from './trailer-window.module.css';

type TrailerWindowProps = {
  filmId: number | null;
  onClose: VoidFunction;
};

export const TrailerWindow = ({ filmId, onClose }: TrailerWindowProps) => {
  const { data, isLoading } = useQuery(getFilmTrailersQueryOptions(filmId));

  return (
    <Modal isOpen={!!filmId} onClose={onClose}>
      <Modal.Content>
        <div className={styles.trailer_content}>
          {isLoading && <Loader shouldInheritColor />}
          {!data && !isLoading && <div className={styles.empty}>Trailer not found</div>}
          {data && <iframe src={data} allow="autoplay" allowFullScreen />}
        </div>
      </Modal.Content>
    </Modal>
  );
};
