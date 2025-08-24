import { type FormEvent, useRef, useState } from 'react';
import { PopupMenu } from '../popup-menu/popup-menu';
import { type ListOption, type SortingOrder, sortingDirectionOptions } from '@/common';
import { SortingButton } from './components';
import { BadgeCheckbox } from '../badge-checkbox/badge-checkbox';
import { getDefaultLabel } from './helpers';
import styles from './sorting-popup.module.css';

export type SortingParams = {
  orderKey: string;
  order: SortingOrder;
};

type SortingPopupProps = {
  fields: ListOption[];
  defaultOrderKey?: string;
  defaultOrder?: SortingOrder;
  onSorting: (params: SortingParams) => void;
  buttonSize?: 'small' | 'large';
};

export const SortingPopup = ({
  fields,
  onSorting,
  defaultOrderKey = 'createdAt',
  defaultOrder = 'desc',
  buttonSize = 'small',
}: SortingPopupProps) => {
  const sortingPopupButton = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedData, setSelectedData] = useState(() => {
    return {
      label: getDefaultLabel(fields, defaultOrderKey),
      order: defaultOrder,
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

    const rawSortingFieldOption = formData.get('orderKey') as string;
    const order = formData.get('order') as SortingOrder;

    const [label, orderKey] = rawSortingFieldOption.split(':');

    setSelectedData({ label, order });
    onSorting({ orderKey, order });

    handleClose();
  };

  return (
    <>
      <SortingButton
        onClick={handleToggle}
        ref={sortingPopupButton}
        size={buttonSize}
        order={selectedData.order}
      >
        {isOpen ? 'Select sorting' : selectedData.label}
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
                name="orderKey"
                defaultChecked={field.value === defaultOrderKey}
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
                name="order"
                defaultChecked={direction.value === defaultOrder}
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
