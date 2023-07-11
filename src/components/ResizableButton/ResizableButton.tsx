import './resizable-button.css';
import classNames from "classnames";
import { FC } from "react";

type ResizableButtonProps = {
  onClick(): void;
  isActive: boolean;
  expandTitle: string;
  smallTitle: string | number;
  disabled?: boolean;
}

const ResizableButton: FC<ResizableButtonProps> = ({
  onClick,
  isActive,
  expandTitle,
  smallTitle,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames('resizable-button', {
        'resizable-button--active': isActive
      })}
      disabled={disabled}
    >
      <span className="resizable-button__title">{expandTitle}</span>
      <span>{smallTitle}</span>
    </button>
  );
};

export default ResizableButton;