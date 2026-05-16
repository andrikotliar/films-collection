import styles from './award.module.css';
import { Button, IconLink, type api, type ApiResponse } from '~/shared';
import { InfoIcon, LinkIcon, TrophyIcon } from 'lucide-react';

type AwardProps = {
  data: ApiResponse<typeof api.films.getById.exec>['awards'][number]['award'];
  onSelect: VoidFunction;
  nominationsCount: number;
};

export const Award = ({ data, onSelect, nominationsCount }: AwardProps) => {
  return (
    <div className={styles.award}>
      <div className={styles.column}>
        <TrophyIcon className={styles.award_icon} />
        <div>
          {data.title} ({nominationsCount})
        </div>
      </div>
      <div className={styles.column}>
        <IconLink to="/" search={{ awardId: data.id }} icon={<LinkIcon size={18} />} />
        <Button variant="ghost" onClick={onSelect} icon={<InfoIcon />} />
      </div>
    </div>
  );
};
