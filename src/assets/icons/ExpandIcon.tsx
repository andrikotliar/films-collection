import { FC } from "react";

type ExpandIconProps = {
  color?: string,
  className?: string
};

const ExpandIcon: FC<ExpandIconProps> = ({
  color,
  className
}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 32 32"><path fill={color} d="M24.285 11.284 16 19.571l-8.285-8.288a1.01 1.01 0 1 0-1.429 1.43l8.999 9.002a1.009 1.009 0 0 0 1.428 0l8.999-9.002a1.01 1.01 0 1 0-1.427-1.429z"/></svg>
  );
};

export default ExpandIcon;