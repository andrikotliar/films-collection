import { Button } from '~/shared/components/button/button';
import styles from './styles.module.css';
import clsx from 'clsx';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { forwardRef, type KeyboardEvent, type PropsWithChildren } from 'react';
import { Loader } from '~/shared/components/loader/loader';

type Props = {
  onClick: VoidFunction;
  onClear: VoidFunction;
  onKeyDown: (event: KeyboardEvent) => void;
  isActive: boolean;
  shouldShowClearButton: boolean;
  isDisabled: boolean;
  isLoading?: boolean;
};

export const TriggerButton = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      onClick,
      onClear,
      onKeyDown,
      isActive,
      children,
      shouldShowClearButton,
      isDisabled,
      isLoading,
    },
    ref,
  ) => {
    return (
      <div className={styles.wrapper}>
        <button
          ref={ref}
          onClick={onClick}
          className={clsx(styles.select_button, {
            [styles.selectButtonActive]: isActive,
          })}
          onKeyDown={onKeyDown}
          type="button"
          disabled={isDisabled}
          aria-haspopup="listbox"
        >
          <div>{children}</div>
          <ChevronDownIcon size={20} className={clsx(styles.icon, styles.chevron)} />
        </button>
        {isLoading && (
          <div className={styles.select_icon}>
            <Loader size={18} shouldInheritColor />
          </div>
        )}
        {shouldShowClearButton && !isLoading && (
          <div className={styles.select_icon}>
            <Button
              icon={<XIcon className={styles.icon} size={18} />}
              variant="ghost"
              onClick={onClear}
              aria-label="Clear selection"
            />
          </div>
        )}
      </div>
    );
  },
);
