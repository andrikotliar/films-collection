import { Button } from '~/common/components/button/button';
import styles from './trigger-button.module.css';
import classNames from 'classnames';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { forwardRef, KeyboardEvent, ReactNode } from 'react';
import { Loader } from '~/common/components/loader/loader';

type TriggerButtonProps = {
  onClick: VoidFunction;
  onClear: VoidFunction;
  onKeyDown: (event: KeyboardEvent) => void;
  children: ReactNode;
  isActive: boolean;
  shouldShowClearButton: boolean;
  isDisabled: boolean;
  isLoading?: boolean;
};

export const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
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
          className={classNames(styles.selectButton, {
            [styles.selectButtonActive]: isActive,
          })}
          onKeyDown={onKeyDown}
          type="button"
          disabled={isDisabled}
          aria-haspopup="listbox"
        >
          <div>{children}</div>
          <ChevronDownIcon size={20} className={classNames(styles.icon, styles.chevron)} />
        </button>
        {isLoading && (
          <div className={styles.selectIcon}>
            <Loader size={18} shouldInheritColor />
          </div>
        )}
        {shouldShowClearButton && !isLoading && (
          <Button
            icon={<XIcon className={styles.icon} size={18} />}
            variant="ghost"
            onClick={onClear}
            className={styles.selectIcon}
            aria-label="Clear selection"
          />
        )}
      </div>
    );
  },
);
