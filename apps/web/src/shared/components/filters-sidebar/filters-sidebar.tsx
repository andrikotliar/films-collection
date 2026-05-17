import styles from './filters-sidebar.module.css';
import clsx from 'clsx';
import { Loader } from '~/shared/components/loader/loader';
import { defineCssProperties } from '~/shared/helpers';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { MOBILE_VIEW_BREAKPOINT_PX } from '~/shared/constants';
import { Button } from '~/shared/components/button/button';

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
  const sidebarButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.innerWidth > MOBILE_VIEW_BREAKPOINT_PX) {
      return;
    }

    const scrollListener = () => {
      if (!sidebarButtonRef.current) {
        return;
      }

      if (Math.round(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        sidebarButtonRef.current.style.transform = `translate(50%, ${100}px)`;
        sidebarButtonRef.current.dataset.hidden = 'true';
        return;
      }

      if (sidebarButtonRef.current.dataset.hidden === 'true') {
        sidebarButtonRef.current.style.transform = `translate(50%, 0)`;
        sidebarButtonRef.current.dataset.hidden = 'false';
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [sidebarButtonRef]);

  if (isLoading) {
    return (
      <div className={styles.sidebar_content}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <button onClick={onToggle} className={styles.sidebar_button} ref={sidebarButtonRef}>
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
        <div className={styles.close_icon_wrapper}>
          <Button icon={<XIcon />} onClick={onToggle} variant="ghost" />
        </div>
      </div>
    </>
  );
};
