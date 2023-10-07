import './expand-button.css';
import { ExpandIcon } from '@/assets/icons';
import classNames from 'classnames';
import { FC } from 'react';

type ExpandButtonProps = {
  isExpanded: boolean;
  episodesCount: number;
  onClick: VoidFunction;
};

const ExpandButton: FC<ExpandButtonProps> = ({
  isExpanded,
  episodesCount,
  onClick
}) => {
  return (
    <button
      className="expand-button"
      onClick={onClick}
    >
      <span>
        Show {episodesCount} episodes
      </span>
      <ExpandIcon
        color="currentcolor"
        className={classNames(
          'expand-button__icon',
          {
            'expand-button__icon--expanded': isExpanded
          }
        )}
      />
    </button>
  );
};

export { ExpandButton };