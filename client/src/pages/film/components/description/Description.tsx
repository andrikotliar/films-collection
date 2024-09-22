import { FC } from 'react';
import styles from './Description.module.css';
import { FilmDescription } from '@/types';

type DescriptionProps = {
  content: FilmDescription[];
};

const Description: FC<DescriptionProps> = ({ content }) => {
  return (
    <div>
      {content.map((section, index) => (
        <div key={index}>
          {section.title && <h3 className={styles.title}>{section.title}</h3>}
          <p className={styles.text}>{section.text}</p>
        </div>
      ))}
    </div>
  );
};

export { Description };
