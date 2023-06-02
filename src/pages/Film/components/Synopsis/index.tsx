import { FC } from 'react';
import './styles.css'

const Synopsis: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="synopsis">
      {text}
    </div>
  );
};

export default Synopsis;