import { FC, PropsWithChildren } from 'react';
import './styles.css';

const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="section-title">
      {children}
    </h2>
  );
};

export default SectionTitle;