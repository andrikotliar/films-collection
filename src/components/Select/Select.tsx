import classNames from 'classnames';
import classes from './Select.module.css';
import { FC, KeyboardEvent, useState } from 'react';
import { ExpandIcon } from '@/assets/icons';
 
type Option = {
  label: string,
  value: string | number;
};

type SelectProps = {
  options: Option[];
  defaultValue?: Option;
  onSelect?: (option: Option) => void;
};

const Select: FC<SelectProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (option: Option) => {
    setIsOpen(false);
    if(selectedOption.value !== option.value) {
      setSelectedOption(option);
      onSelect && onSelect(option);
    }
  };

  const handleDropdown = () => {
    setIsOpen(isOpen => !isOpen);
  }

  const handleDropdownOnKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      handleDropdown();
    }

    if(e.key === 'Escape') {
      setIsOpen(false);
    }

    if(e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  }

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
        <span>{selectedOption?.label}</span>
        <ExpandIcon
          className={classNames(
            classes.expandIcon,
            {
              [classes.expanded]: isOpen 
            }
          )}
        />
      </div>
      <ul
        className={classNames(
          classes.dropdown,
          {
            [classes.visible]: isOpen
          }
        )}
        role="menu"
      >
        {options.map((option) => (
          <li
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              handleChange(option);
            }}
            className={classNames(
              classes.option,
              {
                [classes.selected]: option.value === selectedOption?.value
              }
            )}
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