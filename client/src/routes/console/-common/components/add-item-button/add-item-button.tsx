import { Button, type ButtonProps } from '@/components';
import { PlusIcon } from 'lucide-react';

type AddItemButtonProps = Omit<ButtonProps, 'variant' | 'icon'>;

export const AddItemButton = (props: AddItemButtonProps) => {
  return <Button variant="light" icon={<PlusIcon />} {...props} />;
};
