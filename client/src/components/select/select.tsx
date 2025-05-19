import styles from './select.module.css';
import {
  ChangeEvent,
  FC,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from 'react';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { ListOption } from '@/types';
import { PopupMenu } from '../popup-menu/popup-menu';
import { parseSelectState } from './helpers';
import { TextInput } from '../text-input';
import { useDebouncedSearch } from '@/hooks';

type InternalValue = {
  [key: string]: boolean;
};

export type SelectProps = {
  options: ListOption<any>[];
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
  const optionsRef = useRef<HTMLInputElement[]>([]);
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

  useEffect(() => {
    if (!isOpen && inputRef.current) {
      const selectedValues = parseSelectState(internalValue);

      if (!selectedValues.length) {
        return;
      }

      if (selectedValues.length > 1) {
        inputRef.current.value = `${selectedValues.length} selected`;
        return;
      }

      const option = options.find(
        (option) => option.value.toString() === selectedValues[0],
      );

      inputRef.current.value = option?.label ?? '';
    }
  }, [isOpen, internalValue, inputRef]);

  useEffect(() => {
    if (!defaultValue) {
      setInternalValue({});

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [defaultValue]);

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
      setIsOpen(false);
      onSelect?.(value);
      setFilteredOptions(options);

      return;
    }

    const result = {
      ...state,
      [value]: isChecked,
    };

    const selectedValues = parseSelectState(result);

    setInternalValue(result);
    onSelect?.(selectedValues);
    setFilteredOptions(options);
  };

  const handleClearInput = () => {
    if (inputRef.current?.value.length) {
      inputRef.current.value = '';
      setFilteredOptions(options);
    }
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

  const handleOpen = () => {
    setIsOpen(true);
    handleClearInput();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKeyboard = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        handleOpen();
        break;

      case 'ArrowDown': {
        event.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        if (optionsRef.current?.length) {
          optionsRef.current[0].focus();
        }

        break;
      }

      case 'ArrowUp': {
        event.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        if (optionsRef.current?.length) {
          optionsRef.current[optionsRef.current.length - 1].focus();
        }

        break;
      }

      case 'Tab':
        break;

      default:
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  const handleOptionKeyDown = (event: KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'Tab': {
        event.preventDefault();

        const nextIndex = (index + 1) % optionsRef.current.length;
        optionsRef.current[nextIndex].focus();

        break;
      }
      case 'ArrowUp': {
        event.preventDefault();

        const prevIndex =
          (index - 1 + optionsRef.current.length) % optionsRef.current.length;

        optionsRef.current[prevIndex].focus();
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <TextInput
        onClick={handleOpen}
        onChange={handleSearch}
        label={label}
        disabled={isDisabled}
        placeholder={placeholder}
        ref={inputRef}
        icon={<ChevronDown className={styles.expandIcon} />}
        onKeyDown={handleKeyboard}
      />
      <PopupMenu
        isOpen={isOpen}
        onClose={handleClose}
        triggerRef={inputRef}
        shouldAdjustToTriggerWidth
        role="menu"
        menuMargin={5}
      >
        <div className={styles.menu}>
          {filteredOptions.map((option, index) => (
            <label key={option.value} className={styles.option}>
              <span>{option.label}</span>
              <input
                name="_select_option"
                type={inputType}
                checked={internalValue[option.value] ?? false}
                className={styles.input}
                value={option.value}
                onChange={(event) => handleChange(event, internalValue)}
                ref={(input) => (optionsRef.current[index] = input!)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
              />
              <CheckIcon className={styles.check} />
            </label>
          ))}
          {filteredOptions.length === 0 && (
            <div className={styles.menuPlaceholder}>No options</div>
          )}
        </div>
      </PopupMenu>
    </div>
  );
};
