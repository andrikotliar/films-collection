import { EventBanner } from '~/routes/_home/-components/films-section/components/event-banner/event-banner';
import styles from './current-events.module.css';
import { type api, type ApiResponse } from '~/shared';

type CurrentEventsProps = {
  events: ApiResponse<typeof api.films.getList.exec>['events'];
};

export const CurrentEvents = ({ events }: CurrentEventsProps) => {
  if (!events.length) {
    return null;
  }

  return (
    <div className={styles.events_track}>
      {events.map((event) => (
        <EventBanner event={event} key={event.id} />
      ))}
    </div>
  );
};
