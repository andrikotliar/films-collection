import { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { ListOption } from '@/types';
import styles from './Select.module.css';
import { PopupMenu } from '../PopupMenu/PopupMenu';
import { parseSelectState } from './helpers';
import { TextInput } from '../TextInput';
import { useDebouncedSearch } from '@/hooks';
import { ScrollableWrapper } from '../ScrollableWrapper/ScrollableWrapper';

type InternalValue = {
  [key: string]: boolean;
};

export type SelectProps = {
  options: ListOption[];
  defaultValue?: string | number | string[] | number[];
  onSelect?: (value: unknown) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isMulti?: boolean;
  label?: string;
};

export const Select: FC<SelectProps> = ({
  options,
  defaultValue,
  onSelect,
  placeholder = 'Select option',
  isDisabled = false,
  isMulti = false,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [internalValue, setInternalValue] = useState<InternalValue>(() => {
    if (!defaultValue) {
      return {};
    }

    if (Array.isArray(defaultValue)) {
      if (isMulti) {
        return defaultValue.reduce<InternalValue>((result, value) => {
          result[value] = true;

          return result;
        }, {});
      }

      return {
        [defaultValue[0]]: true,
      };
    }

    return {
      [defaultValue]: true,
    };
  });

  const inputType = isMulti ? 'checkbox' : 'radio';

  const optionsId = useMemo(() => {
    const randomId = Math.ceil(Math.random() * 1000);

    return randomId;
  }, []);

  const internalPlaceholder = useMemo(() => {
    const selectedValues = parseSelectState(internalValue);

    if (selectedValues.length === 0) {
      return placeholder;
    }

    if (selectedValues.length > 1) {
      return `${selectedValues.length} selected`;
    }

    const option = options.find((option) => option.value === selectedValues[0]);

    return option?.label ?? placeholder;
  }, [internalValue, isMulti, placeholder, options]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    state: InternalValue,
  ) => {
    const isChecked = event.target.checked;
    const type = event.target.type;
    const value = event.target.value;

    if (type === 'radio') {
      const result = {
        [value]: isChecked,
      };

      setInternalValue(result);
      onSelect?.(value);

      return;
    }

    const result = {
      ...state,
      [value]: isChecked,
    };

    const selectedValues = parseSelectState(result);

    setInternalValue(result);
    onSelect?.(selectedValues);
  };

  const handleSearch = useDebouncedSearch((value) => {
    if (value?.length) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase()),
      );

      setFilteredOptions(filtered);

      return;
    }

    setFilteredOptions(options);
  });

  return (
    <div aria-expanded={isOpen} className={styles.wrapper} role="combobox">
      <TextInput
        onFocus={() => setIsOpen(true)}
        onChange={handleSearch}
        label={label}
        disabled={isDisabled}
        placeholder={internalPlaceholder}
        ref={inputRef}
        icon={<ChevronDown className={styles.expandIcon} />}
        visiblePlaceholder
      />
      <PopupMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={inputRef}
        shouldAdjustToTriggerWidth
        role="menu"
        menuMargin={5}
      >
        <ScrollableWrapper className={styles.menu}>
          {filteredOptions.map((option) => (
            <label key={option.value} className={styles.option}>
              <span>{option.label}</span>
              <input
                name={`_select_option_${optionsId}`}
                type={inputType}
                checked={internalValue[option.value] ?? false}
                className={styles.input}
                value={option.value}
                onChange={(event) => handleChange(event, internalValue)}
              />
              <CheckIcon className={styles.check} />
            </label>
          ))}
          {filteredOptions.length === 0 && (
            <div className={styles.menuPlaceholder}>No options</div>
          )}
        </ScrollableWrapper>
      </PopupMenu>
    </div>
  );
};
