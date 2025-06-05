import { Button } from '@/components/button/button';
import styles from './trigger-button.module.css';
import classNames from 'classnames';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { forwardRef, KeyboardEvent, PropsWithChildren } from 'react';

type TriggerButtonProps = PropsWithChildren<{
  onClick: VoidFunction;
  onClear: VoidFunction;
  onKeyDown: (event: KeyboardEvent) => void;
  isActive: boolean;
  shouldShowPlaceholder: boolean;
  shouldShowClearButton: boolean;
}>;

export const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  (
    {
      onClick,
      onClear,
      onKeyDown,
      isActive,
      children,
      shouldShowPlaceholder,
      shouldShowClearButton,
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
        >
          <div>
            {shouldShowPlaceholder ? (
              <span className={styles.placeholder}>Select</span>
            ) : (
              <span>{children}</span>
            )}
          </div>
          <ChevronDownIcon
            size={20}
            className={classNames(styles.icon, styles.chevron)}
          />
        </button>
        {shouldShowClearButton && (
          <Button
            icon={<XIcon className={styles.icon} size={18} />}
            variant="ghost"
            onClick={onClear}
            className={styles.clearButton}
          />
        )}
      </div>
    );
  },
);
