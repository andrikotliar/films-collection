import { Button, type ButtonProps } from '~/common';
import { PlusIcon } from 'lucide-react';

type AddItemButtonProps = Omit<ButtonProps, 'variant' | 'icon'>;

export const AddItemButton = (props: AddItemButtonProps) => {
  return (
    <div>
      <Button variant="light" icon={<PlusIcon />} {...props} />
    </div>
  );
};
