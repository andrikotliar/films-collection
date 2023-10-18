import classNames from 'classnames';
import classes from './Select.module.css';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { ExpandIcon } from '@/assets/icons';

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  defaultValue?: Option['value'];
  onSelect?: (option: Option) => void;
};

const Select: FC<SelectProps> = ({ options, defaultValue, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
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
        setActiveIndex((index) => {
          if (index >= 0 && index < options.length - 1) {
            return index + 1;
          }

          return index;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
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

  useEffect(() => {
    if (defaultValue) {
      const index = options.findIndex(
        (option) => option.value === defaultValue,
      );

      if (index !== -1) {
        setSelectedOption(options[index]);
        setActiveIndex(index);
      }
    }
  }, [defaultValue]);

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
        <span>{selectedOption.label}</span>
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
              [classes.selected]: option.value === selectedOption.value,
              [classes.highlighted]: activeIndex === index,
            })}
            role="menuitem"
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
