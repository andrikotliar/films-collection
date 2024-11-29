import { FC, useRef, useState } from 'react';
import styles from './Description.module.css';
import { FilmDescription } from '@/types';
import { ChevronDownIcon } from 'lucide-react';
import classNames from 'classnames';

type DescriptionProps = {
  content: FilmDescription[];
};

const DEFAULT_HEIGHT = 88;

const Description: FC<DescriptionProps> = ({ content }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState<string | number>(() => {
    if (content.length === 1 && content[0].text.length < 1000) {
      return 'auto';
    }

    return DEFAULT_HEIGHT;
  });

  const handleHeightChange = () => {
    if (height !== DEFAULT_HEIGHT) {
      setHeight(DEFAULT_HEIGHT);
      return;
    }

    const fullHeight = textRef.current?.offsetHeight;

    setHeight(fullHeight ?? DEFAULT_HEIGHT);
  };

  const isCollapsed = height === DEFAULT_HEIGHT;

  const buttonLabel = isCollapsed ? 'Read full text' : 'Collapse text';

  return (
    <div>
      <div
        style={{ height }}
        className={classNames(styles.textWrapper, {
          [styles.collapsedText]: isCollapsed,
        })}
      >
        <div ref={textRef}>
          {content.map((section, index) => (
            <p className={styles.text} key={index}>
              {section.title && <span>{section.title}.</span>}
              {section.text}
            </p>
          ))}
        </div>
      </div>
      {height !== 'auto' && (
        <button
          className={classNames(styles.fullTextButton, {
            [styles.fullTextButtonClose]: !isCollapsed,
          })}
          onClick={handleHeightChange}
        >
          <span>{buttonLabel}</span>
          <ChevronDownIcon className={styles.chevronIcon} size={18} />
        </button>
      )}
    </div>
  );
};

export { Description };
