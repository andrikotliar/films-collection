import classNames from 'classnames';
import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { PopupMenu } from '@/components/popup-menu/PopupMenu';
import styles from './Select.module.css';
import { ChevronDownIcon } from 'lucide-react';

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
  const [isTriggerFocused, setIsTriggerFocused] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (option: Option) => {
    setValue(option.value);
    onSelect && onSelect(option.value);
  };

  const handleChange =
    (option: Option, index: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      handleSelectOption(option);
      setActiveIndex(index);
      setIsOpen(false);
    };

  const handleToggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleTriggerFocus = () => {
    setIsTriggerFocused((isFocused) => !isFocused);
  };

  const handleDropdownOnKey = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((index) => {
          if (index >= 0 && index < options.length - 1) {
            return index + 1;
          }

          return index;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
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

  useEffect(() => {
    if (isOpen || isTriggerFocused) {
      document.addEventListener('keydown', handleDropdownOnKey);

      return () => {
        document.removeEventListener('keydown', handleDropdownOnKey);
      };
    }
  }, [isOpen, isTriggerFocused]);

  useEffect(() => {
    if (wrapperRef.current) {
      const children = wrapperRef.current.children;

      (children[activeIndex] as HTMLElement).focus();
    }
  }, [activeIndex, wrapperRef]);

  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      className={classNames({
        [styles.isDisabled]: isDisabled,
      })}
    >
      <button
        className={styles.value}
        onClick={handleToggleDropdown}
        ref={buttonRef}
        onFocus={handleTriggerFocus}
        onBlur={handleTriggerFocus}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDownIcon
          className={classNames(styles.expandIcon, {
            [styles.expanded]: isOpen,
          })}
          size={20}
        />
      </button>
      <PopupMenu
        isOpen={isOpen}
        className={styles.dropdown}
        triggerRef={buttonRef}
        role="menu"
        onClose={handleCloseDropdown}
        menuMargin={5}
        shouldAdjustToTriggerWidth
      >
        <div ref={wrapperRef}>
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={handleChange(option, index)}
              className={classNames(styles.option, {
                [styles.selected]: option.value === selectedOption?.value,
              })}
              role="menuitem"
              data-index={index}
            >
              {option.label}
            </button>
          ))}
        </div>
      </PopupMenu>
    </div>
  );
};

export { Select };
export type { Option };
