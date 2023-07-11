import { FC } from 'react';
import './synopsis.css'

const Synopsis: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="synopsis">
      {text}
    </div>
  );
};

export default Synopsis;