import { Button, type ButtonProps } from '~/shared';
import { PlusIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

type AddItemButtonProps = Omit<ButtonProps, 'variant' | 'icon'>;

export const AddItemButton = (props: PropsWithChildren<AddItemButtonProps>) => {
  return (
    <div>
      <Button variant="light" icon={<PlusIcon />} {...props} />
    </div>
  );
};
