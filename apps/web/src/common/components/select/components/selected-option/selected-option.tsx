import { ListOption } from '~/common';
import styles from './selected-option.module.css';
import { Button } from '~/components/button/button';
import { XIcon } from 'lucide-react';

type SelectedOptionProps = {
  onRemove: (value: ListOption<any>['value']) => void;
  data: ListOption<any>;
  isDisabled: boolean;
};

export const SelectedOption = ({ onRemove, data, isDisabled }: SelectedOptionProps) => {
  return (
    <div className={styles.selectedOption}>
      <span>{data.label}</span>
      {!isDisabled && (
        <Button icon={<XIcon size={15} />} variant="ghost" onClick={() => onRemove(data.value)} />
      )}
    </div>
  );
};
