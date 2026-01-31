import { Button, type ButtonProps } from '~/shared';
import { PlusIcon } from 'lucide-react';

export const AddItemButton = (props: Omit<ButtonProps, 'variant' | 'icon'>) => {
  return <Button variant="light" icon={<PlusIcon />} {...props} />;
};
