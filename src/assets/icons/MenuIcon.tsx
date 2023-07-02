import { FC } from "react";

const MenuIcon: FC<{ color?: string }> = ({ color = "#fff" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={color} d="M19 8H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2ZM19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2ZM19 18H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2Z"/></svg>
  );
};

export default MenuIcon;