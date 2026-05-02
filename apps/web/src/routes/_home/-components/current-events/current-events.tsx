import styles from './current-events.module.css';
import { type api, type ApiResponse } from '~/shared';
import { EventBanner } from '~/routes/_home/-components/event-banner/event-banner';

type CurrentEventsProps = {
  events: ApiResponse<typeof api.films.getDashboard.exec>['events'];
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
