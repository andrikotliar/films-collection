import { IconType } from "@/types";
import { FC } from "react";

const ResetIcon: FC<IconType> = ({ color = "#fff", className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512"><path fill={color} d="M64 256H34a222 222 0 0 1 396-137.85V85h30v105H355v-30h67.27A192.21 192.21 0 0 0 256 64C150.13 64 64 150.13 64 256Zm384 0c0 105.87-86.13 192-192 192a192.21 192.21 0 0 1-166.27-96H157v-30H52v105h30v-33.15A222 222 0 0 0 478 256Z"/></svg>
  );
};

export { ResetIcon };