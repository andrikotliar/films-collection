import { DataSection } from '~/routes/_home/-components/data-section/data-section';
import {
  getEmbeddableYoutubeUrl,
  getPluralWord,
  Image,
  Modal,
  type api,
  type ApiResponse,
} from '~/shared';
import styles from './upcoming-films-widget.module.css';
import { PlayIcon } from 'lucide-react';
import { useState } from 'react';

type UpcomingFilmsWidgetProps = {
  items: ApiResponse<typeof api.films.getDashboard.exec>['upcomingFilms'];
};

export const UpcomingFilmsWidget = ({ items }: UpcomingFilmsWidgetProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  if (!items.length) {
    return null;
  }
  return (
    <DataSection title="Upcoming films" isLoading={false}>
      <div className={styles.row}>
        {items.map((film) => {
          const embeddableUrlData = getEmbeddableYoutubeUrl(film.trailers[0].url);

          return (
            <div key={film.id} className={styles.film}>
              <button
                className={styles.video}
                onClick={() => setSelectedUrl(embeddableUrlData.value)}
              >
                <Image src={embeddableUrlData.preview} />
                <PlayIcon className={styles.play_icon} size={40} />
              </button>
              <div>
                <div className={styles.title}>{film.title}</div>
                <div className={styles.date}>
                  In {film.inDays} {getPluralWord('day', film.inDays)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={selectedUrl !== null}
        onClose={() => setSelectedUrl(null)}
        className={styles.modal}
      >
        <Modal.Content className={styles.modal_content}>
          <iframe
            src={selectedUrl ?? ''}
            allow="autoplay"
            allowFullScreen
            className={styles.iframe}
          />
        </Modal.Content>
      </Modal>
    </DataSection>
  );
};
