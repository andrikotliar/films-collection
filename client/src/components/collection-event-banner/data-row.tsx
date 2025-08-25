import type { ReactNode } from '@tanstack/react-router';

type DataRowProps = {
  icon: ReactNode;
  value: string;
};

export const DataRow = ({ icon, value }: DataRowProps) => {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-600">
      {icon}
      {value}
    </div>
  );
};
