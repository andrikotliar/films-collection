import styles from './SortingPopup.module.css';
import { FC, FormEvent, useRef, useState } from 'react';
import { PopupMenu } from '../PopupMenu/PopupMenu';
import { ConfigOption, SortingDirection } from '@/types';
import { SortingButton } from './components';
import { sortingDirectionOptions } from '@/configs';
import { BadgeCheckbox } from '../BadgeCheckbox/BadgeCheckbox';
import { getDefaultSortingFieldLabel } from './helpers';

export type SortingParams = {
  sortingField: string;
  sortingDirection: SortingDirection;
};

type SortingPopupProps = {
  fields: ConfigOption[];
  defaultSortingField?: string;
  defaultSortingDirection?: SortingDirection;
  onSorting: (params: SortingParams) => void;
  buttonSize?: 'small' | 'large';
};

export const SortingPopup: FC<SortingPopupProps> = ({
  fields,
  onSorting,
  defaultSortingField,
  defaultSortingDirection = 'desc',
  buttonSize = 'small',
}) => {
  const sortingPopupButton = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedData, setSelectedData] = useState(() => {
    return {
      sortingFieldLabel: getDefaultSortingFieldLabel(
        fields,
        defaultSortingField,
      ),
      sortingDirection: defaultSortingDirection,
    };
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleSubmitSorting = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const rawSortingFieldOption = formData.get('sortingField') as string;

    const [sortingFieldLabel, sortingField] = rawSortingFieldOption.split(':');

    const sortingDirection = formData.get(
      'sortingDirection',
    ) as SortingDirection;

    setSelectedData({
      sortingFieldLabel,
      sortingDirection,
    });

    onSorting({
      sortingField,
      sortingDirection,
    });

    handleClose();
  };

  return (
    <>
      <SortingButton
        onClick={handleToggle}
        ref={sortingPopupButton}
        size={buttonSize}
        sortingDirection={selectedData.sortingDirection}
      >
        {isOpen ? 'Select sorting' : selectedData.sortingFieldLabel}
      </SortingButton>
      <PopupMenu
        isOpen={isOpen}
        triggerRef={sortingPopupButton}
        onClose={handleClose}
        positionMarker="right"
        className={styles.sortingPopupWrapper}
      >
        <form onSubmit={handleSubmitSorting}>
          <div className={styles.groupLabel}>Sort By</div>
          <div className={styles.options}>
            {fields.map((field) => (
              <BadgeCheckbox
                type="radio"
                value={`${field.label}:${field.value}`}
                name="sortingField"
                defaultChecked={field.value === defaultSortingField}
                label={field.label}
                key={field.value}
              />
            ))}
          </div>
          <div className={styles.groupLabel}>Sort Order</div>
          <div className={styles.options}>
            {sortingDirectionOptions.map((direction) => (
              <BadgeCheckbox
                type="radio"
                value={direction.value}
                name="sortingDirection"
                defaultChecked={direction.value === defaultSortingDirection}
                label={direction.label}
                key={direction.value}
              />
            ))}
          </div>
          <button className={styles.applyButton} type="submit">
            Apply
          </button>
        </form>
      </PopupMenu>
    </>
  );
};
