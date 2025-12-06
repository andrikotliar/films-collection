import { type ListOption } from '~/shared';
import styles from './selected-option.module.css';
import { Button } from '~/shared/components/button/button';
import { XIcon } from 'lucide-react';

type SelectedOptionProps = {
  onRemove: (value: ListOption<any>['value']) => void;
  data: ListOption<any>;
  isDisabled: boolean;
};

export const SelectedOption = ({ onRemove, data, isDisabled }: SelectedOptionProps) => {
  return (
    <div className={styles.selected_option}>
      <span>{data.label}</span>
      {!isDisabled && (
        <Button icon={<XIcon size={15} />} variant="ghost" onClick={() => onRemove(data.value)} />
      )}
    </div>
  );
};
