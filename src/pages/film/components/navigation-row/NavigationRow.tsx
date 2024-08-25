import { ArrowLeftIcon } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationRow.module.css';
import { SeasonSelect } from '../season-select/SeasonSelect';
import { SeasonType } from '@/common/types';

type NavigationRowProps = {
  setActiveIndex: Dispatch<SetStateAction<number>>;
  seasons?: SeasonType[];
};

const NavigationRow: FC<NavigationRowProps> = ({ setActiveIndex, seasons }) => {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeftIcon className={styles.backLinkIcon} />
        <span>Back to list</span>
      </Link>
      <SeasonSelect onChange={setActiveIndex} seasons={seasons} />
    </div>
  );
};

export { NavigationRow };
