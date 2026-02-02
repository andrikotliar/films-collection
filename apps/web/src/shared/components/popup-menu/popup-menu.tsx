import {
  FloatingElement,
  type FloatingElementProps,
} from '~/shared/components/popup-menu/components';

export const PopupMenu = (props: FloatingElementProps) => {
  if (!props.isOpen) {
    return null;
  }

  return <FloatingElement {...props} />;
};
