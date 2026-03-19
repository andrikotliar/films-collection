import { useRef, useState } from 'react';
import { PopupMenu } from '../popup-menu/popup-menu';
import { Button, sortingDirectionOptions } from '~/shared';
import styles from './sorting-popup.module.css';
import type { ListOption, SortingOrder } from '@films-collection/shared';
import { getDefaultLabel } from '~/shared/components/sorting-popup/helpers';
import { ArrowDownAZIcon, ArrowUpAZIcon } from 'lucide-react';
import clsx from 'clsx';

export type SortingParams = {
  orderKey?: string;
  order?: SortingOrder;
};

type SortingPopupProps = {
  fields: ListOption<string>[];
  defaultOrderKey: string;
  defaultOrder: SortingOrder;
  onSorting: (params: SortingParams) => void;
};

export const SortingPopup = ({
  fields,
  onSorting,
  defaultOrderKey,
  defaultOrder,
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

  const handleSorting = (field: ListOption<string>, order: SortingOrder) => {
    onSorting({
      orderKey: field.value,
      order,
    });
    setSelectedData({
      label: field.label,
      order,
    });
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleToggle}
        ref={sortingPopupButton}
        variant="ghost"
        icon={selectedData.order === 'asc' ? <ArrowUpAZIcon /> : <ArrowDownAZIcon />}
        fitWidth
        size="small"
      >
        <div className={styles.button_content}>
          <span className={styles.button_label}>Sorted by:</span> {selectedData.label}
        </div>
      </Button>
      <PopupMenu
        isOpen={isOpen}
        triggerRef={sortingPopupButton}
        onClose={handleClose}
        shouldAdjustToTriggerWidth={false}
        className={styles.sorting_popup_wrapper}
      >
        {fields.map((field) => {
          const isActiveField = defaultOrderKey === field.value;

          return (
            <div className={clsx(styles.row, isActiveField && styles.active_row)} key={field.value}>
              <div className={styles.field_label}>{field.label}</div>
              <div className={styles.row_buttons}>
                {sortingDirectionOptions.map((option) => (
                  <button
                    className={clsx(
                      styles.row_button,
                      isActiveField &&
                        selectedData.order === option.value &&
                        styles.active_row_button,
                    )}
                    onClick={() => handleSorting(field, option.value)}
                    key={option.value}
                    disabled={isActiveField && defaultOrder === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </PopupMenu>
    </>
  );
};
