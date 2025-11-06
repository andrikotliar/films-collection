import { type ListOption } from '~/lib';
import styles from './styles.module.css';
import { Button } from '~/lib/components/button/button';
import { XIcon } from 'lucide-react';

type Props = {
  onRemove: (value: ListOption<any>['value']) => void;
  data: ListOption<any>;
  isDisabled: boolean;
};

export const SelectedOption = ({ onRemove, data, isDisabled }: Props) => {
  return (
    <div className={styles.selected_option}>
      <span>{data.label}</span>
      {!isDisabled && (
        <Button icon={<XIcon size={15} />} variant="ghost" onClick={() => onRemove(data.value)} />
      )}
    </div>
  );
};
