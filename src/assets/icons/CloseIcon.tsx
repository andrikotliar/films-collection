import { FC } from "react";

const CloseIcon: FC<{ color: string }> = ({ color = "#fff" }) => {
  return (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg"><path d="M14.8 12l3.6-3.6c.8-.8.8-2 0-2.8-.8-.8-2-.8-2.8 0L12 9.2 8.4 5.6c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8L9.2 12l-3.6 3.6c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6s1-.2 1.4-.6l3.6-3.6 3.6 3.6c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8L14.8 12z"/></svg>
  );
};

export default CloseIcon;