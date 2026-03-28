import styles from './filters-sidebar.module.css';
import clsx from 'clsx';
import { Filters, type FiltersProps } from '~/shared/components/filters/filters';
import { Loader } from '~/shared/components/loader/loader';
import { countObjectKeys, defineCssProperties } from '~/shared/helpers';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { MOBILE_VIEW_BREAKPOINT_PX } from '~/shared/constants';

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  isLoading: boolean;
  height: string;
  topPosition: string;
} & Omit<FiltersProps, 'filtersCount'>;

export const FiltersSidebar = ({
  isOpen,
  onToggle,
  isLoading,
  height,
  topPosition,
  ...filtersProps
}: SidebarProps) => {
  const sidebarButtonRef = useRef<HTMLButtonElement>(null);
  const filtersCount = countObjectKeys(filtersProps.defaultValues ?? {}, ['pageIndex']);

  useEffect(() => {
    if (window.innerWidth > MOBILE_VIEW_BREAKPOINT_PX) {
      return;
    }

    const scrollListener = () => {
      if (!sidebarButtonRef.current) {
        return;
      }

      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        sidebarButtonRef.current.style.transform = `translateY(${100}px)`;
        sidebarButtonRef.current.dataset.hidden = 'true';
        return;
      }

      if (sidebarButtonRef.current.dataset.hidden === 'true') {
        sidebarButtonRef.current.style.transform = `translateY(0)`;
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
        {filtersCount > 0 && <span className={styles.sidebar_button_count}>{filtersCount}</span>}
      </button>
      <div
        className={clsx(styles.sidebar_content, {
          [styles.open]: isOpen,
        })}
        style={defineCssProperties({
          '--sidebar-height': height,
          '--sidebar-top-position': topPosition,
        })}
      >
        <Filters filtersCount={filtersCount} {...filtersProps} />
      </div>
    </>
  );
};
