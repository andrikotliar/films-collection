import {
  FloatingElement,
  type FloatingElementProps,
} from '~/shared/components/popup-menu/components/floating-element/floating-element';

export const PopupMenu = (props: FloatingElementProps) => {
  if (!props.isOpen) {
    return null;
  }

  return <FloatingElement {...props} />;
};
