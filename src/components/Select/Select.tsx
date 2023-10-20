import classNames from 'classnames';
import classes from './Select.module.css';
import { FC, KeyboardEvent, useState } from 'react';
import { ExpandIcon } from '@/assets/icons';

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  defaultValue?: Option | null;
  onSelect?: (option: Option) => void;
  placeholder?: string;
};

const Select: FC<SelectProps> = ({
  options,
  defaultValue = null,
  onSelect,
  placeholder = 'Select option',
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultValue,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option: Option) => {
    setSelectedOption(option);
    onSelect && onSelect(option);
  };

  const handleChange = (option: Option, index: number) => {
    selectOption(option);
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
        selectOption(options[activeIndex]);
        break;
      case 'Enter':
        handleDropdown();
        selectOption(options[activeIndex]);
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

  return (
    <div
      className={classes.select}
      tabIndex={0}
      onClick={handleDropdown}
      onKeyDown={handleDropdownOnKey}
      onBlur={() => setIsOpen(false)}
      role="combobox"
      aria-expanded={isOpen}
    >
      <div className={classes.value}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ExpandIcon
          className={classNames(classes.expandIcon, {
            [classes.expanded]: isOpen,
          })}
        />
      </div>
      <ul
        className={classNames(classes.dropdown, {
          [classes.visible]: isOpen,
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
            className={classNames(classes.option, {
              [classes.selected]: option.value === selectedOption?.value,
              [classes.highlighted]: activeIndex === index,
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
