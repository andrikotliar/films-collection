import { FC, useRef, useState } from 'react';
import { PopupMenu } from '../PopupMenu/PopupMenu';
import { SelectOption, SortingDirection } from '@/types';
import { FilterOption, SortingButton } from './components';
import styles from './SortingPopup.module.css';
import { sortingDirectionOptions } from '@/configs';

type SortingFieldOption = SelectOption;

export type SortingParams = {
  sortingField: string;
  sortingDirection: SortingDirection;
};

type InternalSortingState = {
  sortingField: SortingFieldOption;
  sortingDirection: SortingDirection;
};

type SortingPopupProps = {
  fields: SortingFieldOption[];
  defaultSortingField?: string;
  defaultSortingDirection?: SortingDirection;
  onSorting: (params: SortingParams) => void;
};

export const SortingPopup: FC<SortingPopupProps> = ({
  fields,
  onSorting,
  defaultSortingField,
  defaultSortingDirection = 'desc',
}) => {
  const sortingPopupButton = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [sorting, setSorting] = useState<InternalSortingState>(() => {
    if (!defaultSortingField) {
      return {
        sortingField: fields[0],
        sortingDirection: 'desc',
      };
    }

    const selectedField = fields.find(
      (field) => field.label === defaultSortingField,
    );

    if (!selectedField) {
      return {
        sortingField: fields[0],
        sortingDirection: 'desc',
      };
    }

    return {
      sortingField: selectedField,
      sortingDirection: defaultSortingDirection,
    };
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const applyFilters = (data: InternalSortingState) => {
    onSorting({
      sortingField: data.sortingField.value,
      sortingDirection: data.sortingDirection,
    });

    handleClose();
  };

  const handleSetSortingField = (field: SortingFieldOption) => {
    setSorting((prev) => ({
      ...prev,
      sortingField: field,
    }));
  };

  const handleSetSortingDirection = (direction: SortingDirection) => {
    setSorting((prev) => ({
      ...prev,
      sortingDirection: direction,
    }));
  };

  return (
    <div>
      <SortingButton onClick={handleToggle} ref={sortingPopupButton}>
        {isOpen ? 'Select sorting' : sorting.sortingField.label}
      </SortingButton>
      <PopupMenu
        isOpen={isOpen}
        triggerRef={sortingPopupButton}
        onClose={handleClose}
        positionMarker="right"
        className={styles.sortingPopup}
      >
        <div className={styles.sortingPopupContainer}>
          <div className={styles.groupLabel}>Sort By</div>
          <div className={styles.options}>
            {fields.map((field) => (
              <FilterOption
                type="radio"
                value={field.value}
                name="sortingField"
                defaultChecked={field.value === sorting.sortingField.value}
                onChange={() => handleSetSortingField(field)}
                label={field.label}
                key={field.value}
              />
            ))}
          </div>
          <div className={styles.groupLabel}>Sort Order</div>
          <div className={styles.options}>
            {sortingDirectionOptions.map((direction) => (
              <FilterOption
                type="radio"
                value={direction.value}
                name="sortingDirection"
                defaultChecked={direction.value === sorting.sortingDirection}
                onChange={() => handleSetSortingDirection(direction.value)}
                label={direction.label}
                key={direction.value}
              />
            ))}
          </div>
        </div>

        <button
          className={styles.applyButton}
          onClick={() => applyFilters(sorting)}
        >
          Apply
        </button>
      </PopupMenu>
    </div>
  );
};
