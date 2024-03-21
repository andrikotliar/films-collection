import classNames from 'classnames';
import { FC, KeyboardEvent, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import styles from './Select.module.css';

type Option = {
  label: string;
  value: string | number;
};

type SelectedValue = Option['value'] | null;

type SelectProps = {
  options: Option[];
  defaultValue?: SelectedValue;
  onSelect?: (value: Option['value']) => void;
  placeholder?: string;
  isDisabled?: boolean;
};

const Select: FC<SelectProps> = ({
  options,
  defaultValue = null,
  onSelect,
  placeholder = 'Select option',
  isDisabled = false,
}) => {
  const [value, setValue] = useState<SelectedValue>(defaultValue);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: Option) => {
    setValue(option.value);
    onSelect && onSelect(option.value);
  };

  const handleChange = (option: Option, index: number) => {
    handleSelectOption(option);
    setActiveIndex(index);
    setIsOpen(false);
  };

  const handleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleDropdownOnKey = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        handleDropdown();
        handleSelectOption(options[activeIndex]);
        break;
      case 'Enter':
        handleDropdown();
        handleSelectOption(options[activeIndex]);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex((index) => {
          if (index >= 0 && index < options.length - 1) {
            return index + 1;
          }

          return index;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex((index) => {
          if (index > 0) {
            return index - 1;
          }

          return index;
        });
        break;
      default:
        break;
    }
  };

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [value, options]);

  return (
    <div
      className={classNames(styles.select, {
        [styles.isDisabled]: isDisabled,
      })}
      tabIndex={0}
      onClick={handleDropdown}
      onKeyDown={handleDropdownOnKey}
      onBlur={() => setIsOpen(false)}
      role="combobox"
      aria-expanded={isOpen}
    >
      <div className={styles.value}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          className={classNames(styles.expandIcon, {
            [styles.expanded]: isOpen,
          })}
        />
      </div>
      <ul
        className={classNames(styles.dropdown, {
          [styles.visible]: isOpen,
        })}
        role="menu"
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              handleChange(option, index);
            }}
            className={classNames(styles.option, {
              [styles.selected]: option.value === selectedOption?.value,
              [styles.highlighted]: activeIndex === index,
            })}
            role="menuitem"
            onMouseEnter={() => setActiveIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Select };
export type { Option };
