import styles from './select.module.css';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDebouncedSearch } from '@/hooks';
import { FormError, ListOption } from '@/types';
import { FieldLabel } from '@/components/field-label/field-label';
import { PopupMenu } from '@/components/popup-menu/popup-menu';
import { FieldError } from '@/components/field-error/field-error';
import {
  Option,
  OptionsSearch,
  SelectedOption,
  TriggerButton,
} from './components';

type SelectedValue = string | number;

export type SelectProps = {
  label?: string;
  error?: FormError;
  options: ListOption<any>[];
  initialValue?: string | string[] | number | number[] | null;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  onSelect: (value: any) => void;
};

export const Select: FC<SelectProps> = ({
  options,
  label,
  error,
  initialValue,
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  onSelect,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLButtonElement[]>([]);
  const focusedIndex = useRef(-1);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalOptions, setInternalOptions] = useState(options);

  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>(() => {
    if (Array.isArray(initialValue)) {
      return initialValue;
    }

    if (typeof initialValue === 'string' || typeof initialValue === 'number') {
      return [initialValue];
    }

    return [];
  });

  const handleToggleDropdown = () => {
    setIsDropdownOpen((isOpen) => !isOpen);
  };

  const handleSearch = useDebouncedSearch((value) => {
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

  const handleSelectValue = (value: any, isActive: boolean) => {
    setIsDropdownOpen(false);

    if (options.length !== internalOptions.length) {
      setInternalOptions(options);
    }

    if (!isMulti) {
      setSelectedValues([value]);
      onSelect(value);
      return;
    }

    if (isActive) {
      const newValues = selectedValues.filter((v) => v !== value);
      onSelect(newValues);
      setSelectedValues(newValues);
      return;
    }

    const newValues = [...selectedValues, value];

    onSelect(newValues);
    setSelectedValues(newValues);
  };

  const handleRemoveOption = (value: any) => {
    setSelectedValues((values) => {
      return values.filter((v) => v !== value);
    });
  };

  const handleClearSelection = () => {
    setSelectedValues([]);

    if (!isMulti) {
      onSelect(null);
      return;
    }

    onSelect([]);
  };

  const hasSelectedValues = selectedValues.length !== 0;
  const shouldShowPlaceholder = !hasSelectedValues || isMulti;
  const shouldShowClearButton = hasSelectedValues && isClearable;
  const shouldShowSelectedOptionsList = isMulti && hasSelectedValues;

  const selectedOptions = useMemo(() => {
    if (!selectedValues.length) {
      return [];
    }

    return options.filter((option) => selectedValues.includes(option.value));
  }, [selectedValues, options]);

  const handleTriggerButtonKeydown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        setIsDropdownOpen(true);
        break;
      }
      default:
        break;
    }
  };

  const handleDropdownKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight': {
        event.preventDefault();

        if (
          focusedIndex.current < 0 ||
          focusedIndex.current === internalOptions.length - 1
        ) {
          focusedIndex.current = 0;
        } else {
          focusedIndex.current += 1;
        }

        optionsRef.current[focusedIndex.current]?.focus();
        break;
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
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
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('keydown', handleDropdownKeydown);
    }

    return () => {
      focusedIndex.current = -1;
      document.removeEventListener('keydown', handleDropdownKeydown);
    };
  }, [isDropdownOpen, internalOptions]);

  return (
    <div className={styles.selectWrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <TriggerButton
        ref={buttonRef}
        onClick={handleToggleDropdown}
        onClear={handleClearSelection}
        onKeyDown={handleTriggerButtonKeydown}
        isActive={isDropdownOpen}
        shouldShowPlaceholder={shouldShowPlaceholder}
        shouldShowClearButton={shouldShowClearButton}
      >
        {selectedOptions[0]?.label}
      </TriggerButton>
      <FieldError error={error} />
      {shouldShowSelectedOptionsList && (
        <div className={styles.selected}>
          {selectedOptions.map((option) => (
            <SelectedOption
              data={option}
              onRemove={handleRemoveOption}
              key={option.value}
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
      >
        <div className={styles.dropdownContainer} ref={optionsWrapperRef}>
          {isSearchable && <OptionsSearch onSearch={handleSearch} />}
          {internalOptions.map((option, index) => (
            <Option
              key={option.value}
              data={option}
              onSelect={handleSelectValue}
              selectedValues={selectedValues}
              ref={(button) => (optionsRef.current[index] = button!)}
            />
          ))}
          {internalOptions.length === 0 && (
            <span className={styles.notFoundOptions}>Options not found</span>
          )}
        </div>
      </PopupMenu>
    </div>
  );
};
