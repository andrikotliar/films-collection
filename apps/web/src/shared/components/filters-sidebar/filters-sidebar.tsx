import styles from './filters-sidebar.module.css';
import clsx from 'clsx';
import { Loader } from '~/shared/components/loader/loader';
import { defineCssProperties } from '~/shared/helpers';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  isLoading?: boolean;
  heightReducer?: `${string}px`;
  topPositionMargin?: `${string}px`;
  children?: React.ReactNode;
  filtersCount?: number;
};

export const FiltersSidebar = ({
  isOpen,
  onToggle,
  isLoading = false,
  heightReducer,
  topPositionMargin,
  filtersCount = 0,
  children,
}: SidebarProps) => {
  if (isLoading) {
    return (
      <div className={styles.sidebar_content}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <button onClick={onToggle} className={styles.sidebar_button}>
        <SlidersHorizontalIcon size={18} />
        <span>Filters</span>
        {filtersCount > 0 && <span className={styles.sidebar_button_count}>{filtersCount}</span>}
      </button>
      <div
        className={clsx(styles.sidebar_content, {
          [styles.open]: isOpen,
        })}
        style={defineCssProperties({
          '--sidebar-height-reducer': heightReducer,
          '--sidebar-top-position-margin': topPositionMargin,
        })}
      >
        {children}
        <button onClick={onToggle} className={styles.close_icon_wrapper}>
          <XIcon />
        </button>
      </div>
    </>
  );
};
