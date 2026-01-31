import { Button } from '~/shared/components/button/button';
import styles from './trigger-button.module.css';
import clsx from 'clsx';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { forwardRef, type ChangeEventHandler, type KeyboardEvent } from 'react';
import { Loader } from '~/shared/components/loader/loader';

type TriggerButtonProps = {
  onClick: VoidFunction;
  onClear: VoidFunction;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: (event: KeyboardEvent) => void;
  displayedValue?: string;
  isActive: boolean;
  isDisabled: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  shouldShowClearButton: boolean;
};

export const TriggerButton = forwardRef<HTMLInputElement, TriggerButtonProps>(
  (
    {
      onClick,
      onClear,
      onKeyDown,
      onChange,
      displayedValue,
      isActive,
      isDisabled,
      isLoading,
      isSearchable = true,
      shouldShowClearButton,
    },
    ref,
  ) => {
    return (
      <div
        className={clsx(styles.wrapper, {
          [styles.select_button_active]: isActive,
        })}
      >
        <input
          ref={ref}
          onClick={onClick}
          className={styles.select_button}
          onKeyDown={onKeyDown}
          onChange={onChange}
          type="text"
          disabled={isDisabled}
          aria-haspopup="listbox"
          readOnly={!isSearchable}
          placeholder=""
        />
        <div className={styles.displayed_value}>{displayedValue}</div>
        <div className={styles.icons}>
          {isLoading && <Loader size={18} shouldInheritColor />}
          {shouldShowClearButton && !isLoading && (
            <Button
              icon={<XIcon className={styles.icon} size={18} />}
              variant="ghost"
              onClick={onClear}
              aria-label="Clear selection"
            />
          )}
          <ChevronDownIcon size={20} className={clsx(styles.icon, styles.chevron)} />
        </div>
      </div>
    );
  },
);
