import styles from './filters-sidebar.module.css';
import clsx from 'clsx';
import { Filters, type FiltersProps } from '~/shared/components/filters/filters';
import { Loader } from '~/shared/components/loader/loader';
import { Button } from '~/shared/components/button/button';
import { defineCssProperties } from '~/shared/helpers';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  height: string;
  topPosition: string;
} & FiltersProps;

export const FiltersSidebar = ({
  isOpen,
  onClose,
  isLoading,
  height,
  topPosition,
  ...filtersProps
}: SidebarProps) => {
  if (isLoading) {
    return (
      <div className={styles.sidebar_content}>
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={clsx(styles.sidebar_content, {
        [styles.open]: isOpen,
      })}
      style={defineCssProperties({
        '--sidebar-height': height,
        '--sidebar-top-position': topPosition,
      })}
    >
      <div className={styles.filter_wrapper}>
        <Filters {...filtersProps} />
        <div className={styles.close_button_wrapper}>
          <Button type="button" onClick={onClose} variant="light">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
