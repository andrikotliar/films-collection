import { type ReactNode } from 'react';

type FormTitleProps = {
  children?: ReactNode;
};

export const FormTitle = ({ children }: FormTitleProps) => {
  return <h2 className="text-xl text-gray-500 font-bold">{children}</h2>;
};
