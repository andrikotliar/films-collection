import styles from './select.module.css';
import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type FormError, useDebouncedSearch } from '~/shared';
import { FieldLabel } from '~/shared/components/field-label/field-label';
import { PopupMenu } from '~/shared/components/popup-menu/popup-menu';
import { FieldError } from '~/shared/components/field-error/field-error';
import {
  CreateNewItemButton,
  NotFound,
  Option,
  OptionsSearch,
  Placeholder,
  SelectedOption,
  TriggerButton,
} from './components';
import { getSelectValue } from './helpers';
import type { ListOption } from '@films-collection/shared';

export type SelectProps = {
  label?: string;
  error?: FormError;
  options: ListOption<any>[];
  value?: string | string[] | number | number[] | null;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  isOptionsLoading?: boolean;
  onSelect: (value: any) => void;
  onOptionsSearch?: (value: string | null) => void;
  onCreateOption?: VoidFunction;
  onClear?: VoidFunction;
};

export const Select = ({
  options,
  label,
  error,
  value = null,
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  isDisabled = false,
  placeholder = 'Select...',
  isOptionsLoading = false,
  onSelect,
  onOptionsSearch,
  onCreateOption,
  onClear,
}: SelectProps) => {
  const selectedValues = useMemo(() => {
    return getSelectValue(value);
  }, [value]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLButtonElement[]>([]);
  const focusedIndex = useRef(-1);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalOptions, setInternalOptions] = useState(options);
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen((isOpen) => !isOpen);
  }, []);

  const handleSearch = useDebouncedSearch((value) => {
    if (typeof onOptionsSearch === 'function') {
      onOptionsSearch(value);
      return;
    }

    if (!value) {
      setInternalOptions(options);
      return;
    }

    setInternalOptions((options) => {
      return options.filter((option) => {
        return option.label.toLowerCase().includes(value);
      });
    });
  });

  const handleFinishSelection = useCallback(() => {
    setIsDropdownOpen(false);
    setInternalOptions(options);
    setSearchInputValue('');

    if (typeof onOptionsSearch === 'function') {
      onOptionsSearch(null);
    }
  }, [onOptionsSearch]);

  const handleSelectValue = useCallback(
    (value: unknown, isActive: boolean) => {
      handleFinishSelection();

      if (!isMulti) {
        onSelect(value);
        return;
      }

      if (isActive) {
        const newValues = selectedValues.filter((v) => v !== value);
        onSelect(newValues);
        return;
      }

      const newValues = [...selectedValues, value];

      onSelect(newValues);
    },
    [onSelect, selectedValues],
  );

  const handleRemoveOption = useCallback(
    (value: unknown) => {
      onSelect(selectedValues.filter((v) => v !== value));
    },
    [onSelect, selectedValues],
  );

  const handleClearSelection = useCallback(() => {
    onSelect(isMulti ? [] : null);
    setSearchInputValue('');

    if (typeof onClear === 'function') {
      onClear();
    }
  }, [onSelect, onClear]);

  const selectedOptions = useMemo(() => {
    if (!selectedValues.length) {
      return [];
    }

    return options.filter((option) => selectedValues.includes(option.value));
  }, [selectedValues, options]);

  const handleTriggerButtonKeydown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        setIsDropdownOpen(true);
        break;
      }
      default:
        break;
    }
  }, []);

  const handleDropdownKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (!isDropdownOpen) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();

          if (focusedIndex.current < 0 || focusedIndex.current === internalOptions.length - 1) {
            focusedIndex.current = 0;
          } else {
            focusedIndex.current += 1;
          }

          optionsRef.current[focusedIndex.current]?.focus();
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();

          if (focusedIndex.current < 0 || focusedIndex.current === 0) {
            focusedIndex.current = internalOptions.length - 1;
          } else {
            focusedIndex.current -= 1;
          }

          optionsRef.current[focusedIndex.current]?.focus();
          break;
        }
        default:
          break;
      }
    },
    [isDropdownOpen, internalOptions],
  );

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('keydown', handleDropdownKeydown);
    }

    return () => {
      focusedIndex.current = -1;
      document.removeEventListener('keydown', handleDropdownKeydown);
    };
  }, [isDropdownOpen, internalOptions]);

  useEffect(() => {
    setInternalOptions(options);
  }, [options]);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
    handleSearch(event);
  }, []);

  const handleClickAddItem = () => {
    onCreateOption?.();
    onOptionsSearch?.(null);
    setSearchInputValue('');
    setIsDropdownOpen(false);
  };

  const hasSelectedValues = selectedValues.length !== 0;
  const shouldShowPlaceholder = !hasSelectedValues || isMulti;
  const shouldShowClearButton = hasSelectedValues && isClearable && !isDisabled;
  const shouldShowSelectedOptionsList = isMulti && hasSelectedValues;

  return (
    <div className={styles.select_wrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <TriggerButton
        ref={buttonRef}
        onClick={handleToggleDropdown}
        onClear={handleClearSelection}
        onKeyDown={handleTriggerButtonKeydown}
        isActive={isDropdownOpen}
        shouldShowClearButton={shouldShowClearButton}
        isDisabled={isDisabled}
        isLoading={isOptionsLoading}
      >
        {shouldShowPlaceholder ? (
          <Placeholder>{placeholder}</Placeholder>
        ) : (
          selectedOptions[0]?.label
        )}
      </TriggerButton>
      <FieldError error={error} />
      {shouldShowSelectedOptionsList && (
        <div className={styles.selected}>
          {selectedOptions.map((option) => (
            <SelectedOption
              data={option}
              onRemove={handleRemoveOption}
              key={option.value}
              isDisabled={isDisabled}
            />
          ))}
        </div>
      )}
      <PopupMenu
        triggerRef={buttonRef}
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        shouldAdjustToTriggerWidth
        shouldFocusTriggerOnClose
        role="listbox"
      >
        <div className={styles.dropdown_container} ref={optionsWrapperRef}>
          {isSearchable && <OptionsSearch value={searchInputValue} onSearch={handleSearchChange} />}
          {internalOptions.map((option, index) => (
            <Option
              key={option.value}
              data={option}
              onSelect={handleSelectValue}
              selectedValues={selectedValues}
              ref={(button) => (optionsRef.current[index] = button!)}
            />
          ))}
          {internalOptions.length === 0 && <NotFound />}
          {typeof onCreateOption === 'function' && (
            <CreateNewItemButton onCreate={handleClickAddItem} />
          )}
        </div>
      </PopupMenu>
    </div>
  );
};
